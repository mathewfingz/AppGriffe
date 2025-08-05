const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    console.log('🔍 Verificando usuarios en la base de datos...\n')
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        storeId: true,
        createdAt: true
      }
    })

    if (users.length === 0) {
      console.log('❌ No se encontraron usuarios en la base de datos')
      console.log('💡 Ejecuta: cd packages/database && npm run seed')
      return
    }

    console.log(`✅ Encontrados ${users.length} usuarios:\n`)
    
    for (const user of users) {
      console.log(`📧 Email: ${user.email}`)
      console.log(`👤 Nombre: ${user.name}`)
      console.log(`🔑 Rol: ${user.role}`)
      console.log(`🏪 Store ID: ${user.storeId || 'N/A'}`)
      console.log(`🔒 Password hash: ${user.password ? 'Sí' : 'No'}`)
      
      // Verificar si las contraseñas coinciden
      if (user.password) {
        const testPasswords = ['admin123', 'store123']
        for (const testPass of testPasswords) {
          const isValid = await bcrypt.compare(testPass, user.password)
          if (isValid) {
            console.log(`✅ Contraseña válida: ${testPass}`)
            break
          }
        }
      }
      
      console.log(`📅 Creado: ${user.createdAt}`)
      console.log('---')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()