import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'
import { Role } from '@griffe/database'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
      storeId: string | null
      store?: {
        id: string
        name: string
        slug: string
      } | null
    } & DefaultSession['user']
    accessToken?: string
    refreshToken?: string
  }

  interface User extends DefaultUser {
    role: Role
    storeId: string | null
    store?: {
      id: string
      name: string
      slug: string
    } | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: Role
    storeId: string | null
    store?: {
      id: string
      name: string
      slug: string
    } | null
    accessToken?: string
    refreshToken?: string
  }
}