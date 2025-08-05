import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@griffe.com' },
    update: {},
    create: {
      email: 'admin@griffe.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create sample stores
  const store1 = await prisma.store.upsert({
    where: { slug: 'fashion-store' },
    update: {},
    create: {
      name: 'Fashion Store',
      slug: 'fashion-store',
      description: 'Premium fashion and accessories',
      ownerId: admin.id,
      isActive: true,
    },
  })

  const store2 = await prisma.store.upsert({
    where: { slug: 'tech-store' },
    update: {},
    create: {
      name: 'Tech Store',
      slug: 'tech-store',
      description: 'Latest technology and gadgets',
      ownerId: admin.id,
      isActive: true,
    },
  })

  console.log('✅ Stores created:', store1.name, store2.name)

  // Create store users
  const storePassword = await bcrypt.hash('store123', 12)
  
  const storeUser1 = await prisma.user.upsert({
    where: { email: 'fashion@griffe.com' },
    update: {},
    create: {
      email: 'fashion@griffe.com',
      name: 'Fashion Manager',
      password: storePassword,
      role: 'STORE',
      storeId: store1.id,
      emailVerified: new Date(),
    },
  })

  const storeUser2 = await prisma.user.upsert({
    where: { email: 'tech@griffe.com' },
    update: {},
    create: {
      email: 'tech@griffe.com',
      name: 'Tech Manager',
      password: storePassword,
      role: 'STORE',
      storeId: store2.id,
      emailVerified: new Date(),
    },
  })

  console.log('✅ Store users created:', storeUser1.email, storeUser2.email)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })