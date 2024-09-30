// // prisma/seed.ts
// import { PrismaClient, RoleName } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   await prisma.role.createMany({
//     data: [
//       {
//         roleName: RoleName.FREELANCER,
//         userID: 'placeholder_freelancer', // This is just a placeholder
//         userId: 'placeholder_freelancer'  // This is just a placeholder
//       },
//       {
//         roleName: RoleName.CLIENT,
//         userID: 'placeholder_client',      // This is just a placeholder
//         userId: 'placeholder_client'       // This is just a placeholder
//       },
//     ],
//     skipDuplicates: true, // Skip if roles already exist
//   });
// }

// main()
//   .then(() => console.log('Roles seeded'))
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
