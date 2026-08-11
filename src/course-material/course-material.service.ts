import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateSlideDto } from './dto/create-material.dto';
import { UpdateSlide } from './dto/update-material.dto';

@Injectable()
export class CourseMaterialService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSlideDto) {
    return this.prisma.coursematerial.create({
      data: dto,
    });
  }
  //  GET ALL THE COURSE-MATEIALS
  async findAll() {
    return this.prisma.coursematerial.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  //  get a particular course

  async findOne(id: number) {
    return this.prisma.coursematerial.findUnique({
      where: {
        id,
      },
    });
  }

  //  updateee

  async update(id: number, changes: UpdateSlide) {
    return this.prisma.coursematerial.update({
      where: {
        id,
      },
      data: changes,
    });
  }

  async delete(id: number) {
    return this.prisma.coursematerial.delete({
      where: {
        id,
      },
    });
  }
}
