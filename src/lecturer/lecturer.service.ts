import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class LecturerService {

  constructor(
    private prisma: PrismaService,
  ) {}

  
  async create(createlecturerDto: CreateLecturerDto){
  
   return this.prisma.lecturer.create({
  
    data:createlecturerDto
  
   });
  
  }
  // find all lecturers
  async findAll(){
  
   return this.prisma.lecturer.findMany({
  
    include:{
      user:true,
      department:true,
      level:true
    }
  
   });
  
  }
  
  
  //  find one lecturer
  async findOne(id:number){
  
   return this.prisma.lecturer.findUnique({
  
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
  
  // update a lecturer
  
  
  async update(
   id:number,
   updatelecturerDto: UpdateLecturerDto 
  ){
  
   return this.prisma.lecturer.update({
  
    where:{
      id
    },
  
    data:updatelecturerDto
  
   });
  
  }
  
  // delelte a lecturer 
  
  async remove(id:number){
  
   return this.prisma.lecturer.delete({
  
    where:{
      id
    }
  
   });
  
  }

}