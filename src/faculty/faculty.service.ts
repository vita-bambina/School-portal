import { Injectable } from '@nestjs/common';

import { PrismaService} from '../Prisma/prisma.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Injectable()
export class FacultyService {

    constructor(
    private prisma: PrismaService
  ) {}
// create department
   create(FacultyDto: CreateFacultyDto) {
  
      return this.prisma.faculty.create({
        data: FacultyDto,
      });
  
    }
    
// get all department
    findAll() {

    return this.prisma.faculty.findMany();

  }
 
// get one department
 findOne(id: number) {

    return this.prisma.faculty.findUnique({
      where: {
        id: id,
      },
    });

  }
 
// update faculty
update(id: number, FacultyDto: UpdateFacultyDto) {
    return this.prisma.department.update({
      where: {
        id: id,
      },
      data: FacultyDto,
    });

  }

// delete department
  remove(id: number) {
    return this.prisma.faculty.delete({
      where: {
        id: id,
      },
    });

  }

}
