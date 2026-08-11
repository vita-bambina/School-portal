import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  // Create department
  create(DepartmentDto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: {
        ...DepartmentDto,
      },
    });
  }

  //  cut off marks

  // get  departments
  findAll() {
    return this.prisma.department.findMany({
      include: {
        faculty: {
          select: {
            name: true,
            id: true,
          },
        },

        _count: {
          select: {
            levels: true,
            courses: true,
            student: true,
          },
        },
      },
    });
  }

  // get  department by id
  findOne(id: number) {
    return this.prisma.department.findUnique({
      where: {
        id: id,
      },
    });
  }

  // update department
  update(id: number, DepartmentDto: UpdateDepartmentDto) {
    return this.prisma.department.update({
      where: {
        id: id,
      },
      data: DepartmentDto,
    });
  }

  // delete department
  remove(id: number) {
    return this.prisma.department.delete({
      where: {
        id: id,
      },
    });
  }
}
