import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { createSemester } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Injectable()
export class SemestersService {
  constructor(private prisma: PrismaService) {}

  async create(semesterdto: createSemester) {
    const semester = await this.prisma.semesters.create({
      data: semesterdto,
    });
  }

  findAll() {
    return this.prisma.semesters.findMany();
  }

  // Get one semester by id
  findOne(id: number) {
    return this.prisma.semesters.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updatesemesterDto: UpdateSemesterDto) {
    return this.prisma.semesters.update({
      where: {
        id: id,
      },
      data: updatesemesterDto,
    });
  }

  remove(id: number) {
    return this.prisma.semesters.delete({
      where: {
        id: id,
      },
    });
  }
}
