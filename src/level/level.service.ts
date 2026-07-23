import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';


@Injectable()
export class LevelService {

  constructor(
    private prisma: PrismaService
  ) {}


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

}