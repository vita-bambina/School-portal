import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  // Create a new course
  async create(createCourseDto: CreateCourseDto) {
    const { lecturerIds, ...courseData } = createCourseDto;

    return this.prisma.course.create({
      data: {
        ...courseData,
        lecturers: {
          create: lecturerIds.map((lecturerId) => ({
            lecturerId,
          })),
        },
      },
    });
  }

  // Get all courses
  findAll() {
    return this.prisma.course.findMany({
      include: {
        department: true,
        level: true,
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
  }

  // Get one course
  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: {
        id: id,
      },
    });
  }

  // Update a course
  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: {
        id: id,
      },
      data: updateCourseDto,
    });
  }

  // Delete a course
  remove(id: number) {
    return this.prisma.course.delete({
      where: {
        id: id,
      },
    });
  }
}
