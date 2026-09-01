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
  // Update a course
  // Update a course
  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const { lecturerIds, ...courseData } = updateCourseDto;

    return this.prisma.$transaction(async (tx) => {
      // Update the course
      const course = await tx.course.update({
        where: {
          id: id,
        },
        data: courseData,
      });

      // Find the lecturer-course records for this course
      const lecturerCourses = await tx.lecturerCourse.findMany({
        where: {
          courseId: id,
        },
        select: {
          id: true,
        },
      });

      const lecturerCourseIds = lecturerCourses.map(
        (lecturerCourse) => lecturerCourse.id,
      );

      // Delete course materials belonging to those lecturer-course records
      if (lecturerCourseIds.length > 0) {
        await tx.coursematerial.deleteMany({
          where: {
            lecturerCourseId: {
              in: lecturerCourseIds,
            },
          },
        });
      }

      // Delete the old lecturer assignments
      await tx.lecturerCourse.deleteMany({
        where: {
          courseId: id,
        },
      });

      // Add the new lecturers
      if (lecturerIds && lecturerIds.length > 0) {
        await tx.lecturerCourse.createMany({
          data: lecturerIds.map((lecturerId) => ({
            lecturerId: lecturerId,
            courseId: id,
          })),
        });
      }

      return course;
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

  //  get courses under the level
  async findCoursesByLevel(levelId: number) {
    return this.prisma.course.findMany({
      where: {
        levelId: levelId,
      },
      include: {
        semester: true,
      },
    });
  }
}
