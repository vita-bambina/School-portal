import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';


@Injectable()
export class StudentService {

constructor(
 private prisma: PrismaService
){}


async create(createStudentDto: CreateStudentDto){

 return this.prisma.student.create({

  data:createStudentDto

 });

}

async findAll(){

 return this.prisma.student.findMany({

  include:{
    user:true,
    department:true,
    level:true
  }

 });

}



async findOne(id:number){

 return this.prisma.student.findUnique({

  where:{
    id
  },

  include:{
    user:true,
    department:true,
    level:true
  }

 });

}



async update(
 id:number,
 updateStudentDto:UpdateStudentDto
){

 return this.prisma.student.update({

  where:{
    id
  },

  data:updateStudentDto

 });

}



async remove(id:number){

 return this.prisma.student.delete({

  where:{
    id
  }

 });

}

}