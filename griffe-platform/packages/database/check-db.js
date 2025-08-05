const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkDB() {
  try {
    const users = await prisma.user.findMany()
    console.log('Users found:', users.length)
    
    for (const user of users) {
      console.log(`- ${user.email} (${user.role})`)
    }
    
    if (users.length === 0) {
      console.log('No users found. Running seed...')
      // Run seed logic here if needed
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkDB()