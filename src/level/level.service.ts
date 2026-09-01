import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Prisma } from '@prisma/client';

export interface LevelSummary {
  id: number;
  level: string;
  departmentId: number;
  department: {
    id: number;
    name: string;
    facultyId: number;
  };
  totalStudents: number;
  totalCourses: number;
}

@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}

  // Create a level
  create(createLevelDto: CreateLevelDto) {
    return this.prisma.level.create({
      data: createLevelDto,
    });
  }

  // Get all levels
  findAll() {
    return this.prisma.level.findMany();
  }

  // Get one level
  findOne(id: number) {
    return this.prisma.level.findUnique({
      where: {
        id: id,
      },
    });
  }

  // Update a level
  update(id: number, updateLevelDto: UpdateLevelDto) {
    return this.prisma.level.update({
      where: {
        id: id,
      },
      data: updateLevelDto,
    });
  }

  // Delete a level
  remove(id: number) {
    return this.prisma.level.delete({
      where: {
        id: id,
      },
    });
  }

  // Get all level summary, by adding  all students in each level and doind same for course
  // Get all level summary
  async getLevelSummary() {
    const levels = await this.prisma.level.findMany({
      include: {
        student: true,
        courses: true,
        department: true,
      },
    });

    const summary = levels.reduce((acc: LevelSummary[], level: any) => {
      const existingLevel = acc.find((item) => item.level === level.name);

      if (existingLevel) {
        existingLevel.totalStudents += level.student.length;

        existingLevel.totalCourses += level.courses.length;
      } else {
        acc.push({
          id: level.id,
          level: level.name,
          departmentId: level.departmentId,
          department: {
            id: level.department.id,
            name: level.department.name,
            facultyId: level.department.facultyId,
          },
          totalStudents: level.student.length,
          totalCourses: level.courses.length,
        });
      }

      return acc;
    }, []);

    return summary;
  }

  async findLevelsByDepartment(departmentId: number) {
    return this.prisma.level.findMany({
      where: {
        departmentId: departmentId,
      },
      include: {
        department: true,
      },
    });
  }
}
