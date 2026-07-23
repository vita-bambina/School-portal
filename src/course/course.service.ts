import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {

  constructor(
    private prisma: PrismaService
  ) {}


  // Create a new course
  create(createCourseDto: CreateCourseDto) {

    return this.prisma.course.create({
      data: createCourseDto,
    });

  }


  // Get all courses
  findAll() {

    return this.prisma.course.findMany();

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