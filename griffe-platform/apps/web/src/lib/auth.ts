import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@griffe/database'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { generateAccessToken, generateRefreshToken, revokeAllRefreshTokens } from './jwt'
import { sendWelcomeEmail } from './email'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { email, password } = loginSchema.parse(credentials)
          
          const user = await prisma.user.findUnique({
            where: { email },
            include: { store: true }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(password, user.password)
          
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            storeId: user.storeId,
            store: user.store
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 15 * 60, // 15 minutos para access token
  },
  jwt: {
    maxAge: 15 * 60, // 15 minutos para access token
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        // Primera vez que el usuario se autentica
        token.role = user.role
        token.storeId = user.storeId
        token.store = user.store
        
        // Generar access token y refresh token para el usuario
        try {
          const accessToken = generateAccessToken({
            userId: user.id,
            email: user.email || '',
            role: user.role,
            storeId: user.storeId
          })
          const refreshToken = await generateRefreshToken(user.id)
          
          token.accessToken = accessToken
          token.refreshToken = refreshToken
        } catch (error) {
          console.error('Error generating tokens:', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.storeId = token.storeId
        session.user.store = token.store
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // Enviar email de bienvenida para nuevos usuarios de Google
      if (account?.provider === 'google' && user.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
          })
          
          if (!existingUser) {
            // Nuevo usuario, enviar email de bienvenida
            const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3002'
            await sendWelcomeEmail(
              user.email,
              user.name || 'Usuario',
              `${baseUrl}/auth/login`
            )
          }
        } catch (error) {
          console.error('Error sending welcome email:', error)
        }
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      // Permite redirecciones relativas
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Permite redirecciones al mismo origen
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}