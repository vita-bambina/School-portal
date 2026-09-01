import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.prisma.student.create({
      data: createStudentDto,
    });
  }

  async findAll() {
    return this.prisma.student.findMany({
      include: {
        user: true,
        department: true,
        level: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        department: true,
        level: true,
      },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: {
        id,
      },

      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    return this.prisma.student.delete({
      where: {
        id,
      },
    });
  }

  async getMyCourses(userId: number) {
    const student = await this.prisma.student.findUnique({
      where: {
        userId,
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    if (!student.departmentId || !student.levelId) {
      throw new Error('Student department or level not assigned');
    }

    const courses = await this.prisma.course.findMany({
      where: {
        departmentId: student.departmentId,
        levelId: student.levelId,
      },
      include: {
        lecturers: {
          include: {
            lecturer: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    return courses;
  }

  async getMyProfile(userId: number) {
    const student = await this.prisma.student.findUnique({
      where: {
        userId,
      },
      include: {
        user: true,
        department: true,
        level: true,
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    return student;
  }

  async getMyCourseMaterials(userId: number) {
    const student = await this.prisma.student.findUnique({
      where: {
        userId,
      },
    });

    if (!student) {
      throw new Error('Student not found');
    }

    if (!student.departmentId || !student.levelId) {
      throw new Error('Student department or level not assigned');
    }

    const materials = await this.prisma.coursematerial.findMany({
      where: {
        lecturerCourse: {
          course: {
            departmentId: student.departmentId,
            levelId: student.levelId,
          },
        },
      },

      include: {
        lecturerCourse: {
          include: {
            course: true,
            lecturer: {
              include: {
                user: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return materials;
  }
  
}
