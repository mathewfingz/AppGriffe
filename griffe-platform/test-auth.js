const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testAuth() {
  try {
    console.log('🔍 Probando autenticación...');
    
    // Buscar el usuario admin
    const user = await prisma.user.findUnique({
      where: { email: 'admin@griffe.com' },
      include: { store: true }
    });

    if (!user) {
      console.log('❌ Usuario admin@griffe.com no encontrado');
      return;
    }

    console.log('✅ Usuario encontrado:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      hasPassword: !!user.password,
      passwordLength: user.password ? user.password.length : 0
    });

    // Probar la contraseña
    const testPassword = 'admin123';
    console.log(`🔐 Probando contraseña: "${testPassword}"`);
    
    if (!user.password) {
      console.log('❌ El usuario no tiene contraseña hasheada');
      return;
    }

    const isPasswordValid = await bcrypt.compare(testPassword, user.password);
    console.log('🔍 Resultado de bcrypt.compare:', isPasswordValid);

    // Probar también con hash manual
    const manualHash = await bcrypt.hash(testPassword, 12);
    console.log('🔐 Hash manual de "admin123":', manualHash);
    
    const manualCompare = await bcrypt.compare(testPassword, manualHash);
    console.log('✅ Comparación con hash manual:', manualCompare);

    // Verificar si el hash almacenado es válido
    console.log('📝 Hash almacenado en DB:', user.password);
    console.log('📏 Longitud del hash:', user.password.length);
    console.log('🔍 Formato del hash (debería empezar con $2a$ o $2b$):', user.password.substring(0, 4));

  } catch (error) {
    console.error('❌ Error en test de autenticación:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();