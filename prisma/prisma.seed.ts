import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const enrollments = await prisma.enrollment.findMany({
    where: {
      referenceNumber: null,
      user: {
        role: 'Aspirant',
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  for (const enrollment of enrollments) {
    await prisma.enrollment.update({
      where: {
        id: enrollment.id,
      },
      data: {
        referenceNumber: `ASP-${String(enrollment.id).padStart(5, '0')}`,
      },
    });
  }

  console.log(
    `Generated reference numbers for ${enrollments.length} enrollment(s).`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
