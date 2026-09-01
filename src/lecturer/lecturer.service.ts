import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import { AssignlecturerDto } from './dto/Assign-lecturer.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class LecturerService {
  constructor(private prisma: PrismaService) {}

  async create(createlecturerDto: CreateLecturerDto) {
    const lastLecturer = await this.prisma.lecturer.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    const nextNumber = lastLecturer ? lastLecturer.id + 1 : 1;

    const staffId = `STF/${String(nextNumber).padStart(3, '0')}`;

    console.log('LECTURER DTO:', createlecturerDto);
    console.log('PASSWORD:', createlecturerDto.password);

    // Hash the password the admin created
    const hashedPassword = await bcrypt.hash(createlecturerDto.password, 10);

    // Create the User account first
    const user = await this.prisma.user.create({
      data: {
        firstname: createlecturerDto.firstname,
        lastname: createlecturerDto.lastname,
        email: createlecturerDto.email,
        password: hashedPassword,
        role: 'Lecturer',
      },
    });

    // Now create the Lecturer and connect it to the User
    const lecturer = await this.prisma.lecturer.create({
      data: {
        userId: user.id,
        title: createlecturerDto.title,
        staffId,
        facultyId: createlecturerDto.facultyId,
      },
    });

    return lecturer;
  }

  // find all lecturers
  async findAll() {
    return this.prisma.lecturer.findMany({
      include: {
        user: true,
        faculty: true,
        courses: {
          include: {
            course: {
              include: {
                department: true,
              },
            },
          },
        },
      },
    });
  }

  //  find one lecturer
  async findOne(id: number) {
    return this.prisma.lecturer.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        faculty: true,
        courses: {
          include: {
            course: {
              include: {
                level: true,
                department: true,
                semester: true,
              },
            },
          },
        },
      },
    });
  }

  async getDashboard(userId: number) {
    const lecturer = await this.prisma.lecturer.findUnique({
      where: {
        userId,
      },
      include: {
        courses: {
          include: {
            course: {
              include: {
                level: true,
              },
            },
          },
        },
        _count: {
          select: {
            courses: true,
          },
        },
      },
    });

    if (!lecturer) {
      throw new Error('Lecturer not found');
    }

    const coursesByLevel: Record<string, number> = {};

    lecturer.courses.forEach((lecturerCourse) => {
      const levelName = lecturerCourse.course.level.name;

      coursesByLevel[levelName] = (coursesByLevel[levelName] || 0) + 1;
    });

    return {
      courseCount: lecturer._count.courses,
      coursesByLevel,
    };
  }

  //  get courses
  async getMyCourses(userId: number) {
    const lecturer = await this.prisma.lecturer.findUnique({
      where: {
        userId,
      },
    });

    if (!lecturer) {
      throw new NotFoundException('Lecturer not found');
    }

    const lecturerCourses = await this.prisma.lecturerCourse.findMany({
      where: {
        lecturerId: lecturer.id,
      },
      include: {
        course: {
          include: {
            department: true,
            level: true,
          },
        },

        materials: true,
      },
    });

    const courses = await Promise.all(
      lecturerCourses.map(async (lecturerCourse) => {
        const studentCount = await this.prisma.student.count({
          where: {
            departmentId: lecturerCourse.course.departmentId,
            levelId: lecturerCourse.course.levelId,
          },
        });

        return {
          ...lecturerCourse,
          studentCount,
        };
      }),
    );

    return courses;
  }

  // update a lecturer
  async update(id: number, updatelecturerDto: UpdateLecturerDto) {
    const lecturer = await this.prisma.lecturer.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!lecturer) {
      throw new NotFoundException('Lecturer not found');
    }

    const { title, firstname, lastname, email, password, facultyId } =
      updatelecturerDto;

    // Update User information
    await this.prisma.user.update({
      where: {
        id: lecturer.userId,
      },
      data: {
        ...(firstname !== undefined && { firstname }),
        ...(lastname !== undefined && { lastname }),
        ...(email !== undefined && { email }),
        ...(password !== undefined && {
          password: await bcrypt.hash(password, 10),
        }),
      },
    });

    // Update Lecturer information
    const updatedLecturer = await this.prisma.lecturer.update({
      where: {
        id,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(facultyId !== undefined && { facultyId }),
      },
      include: {
        user: true,
        faculty: true,
      },
    });

    return updatedLecturer;
  }

  // delelte a lecturer

  async remove(id: number) {
    return this.prisma.lecturer.delete({
      where: {
        id,
      },
    });
  }

  //  Assign lecturer

  // async assign(id: number, assignLecturerDto: AssignlecturerDto) {
  //   return this.prisma.lecturer.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       facultyId: assignLecturerDto.facultyId,
  //     },
  //     include: {
  //       user: true,
  //       faculty: true,
  //       level: true,
  //     },
  //   });
  // }
}
