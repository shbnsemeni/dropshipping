import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
try {
  const u = await p.user.update({where:{email:'admin@jsitemuang.xyz'},data:{role:'admin'}});
  console.log('Role updated to admin for', u.email);
} catch (e) {
  console.log('Error:', e.message);
}
await p.$disconnect();
