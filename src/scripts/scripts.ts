import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function generateStudentNumbers() {
  // 👇 Existing students belong to the 2024/2025 session
  const sessionCode = '24';

  const students = await prisma.student.findMany({
    include: {
      department: {
        include: {
          faculty: true,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });

  console.log(`Found ${students.length} students without student numbers.`);

  for (const student of students) {
    if (!student.department) {
      console.log(`Skipping student ${student.id}: no department assigned.`);
      continue;
    }

    if (!student.department.faculty) {
      console.log(`Skipping student ${student.id}: no faculty assigned.`);
      continue;
    }

    const studentIdNumber = String(student.id).padStart(4, '0');

    const departmentIdNumber = String(student.department.id).padStart(2, '0');

    const studentNumber =
      `${student.department.faculty.code}/` +
      `${student.department.code}/` +
      `${sessionCode}` +
      `${studentIdNumber}` +
      `${departmentIdNumber}`;

    await prisma.student.update({
      where: {
        id: student.id,
      },
      data: {
        studentNumber,
      },
    });

    console.log(`Student ${student.id} → ${studentNumber}`);
  }
}

generateStudentNumbers()
  .catch((error) => {
    console.error('❌ Error:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
