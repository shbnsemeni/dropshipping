import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
try {
  const u = await p.user.findUnique({ where: { email: 'admin@jsitemuang.xyz' } });
  console.log('Admin user:', u ? 'FOUND' : 'NOT FOUND');
  if (u) console.log('Email:', u.email, 'Role:', u.role);
} catch (e) {
  console.log('Error:', e.message);
}
await p.$disconnect();
