import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentService {
     constructor(
    private prisma: PrismaService
  ) {}

  async create( userId: number,EnrollmentDto:CreateEnrollmentDto ){ return this.prisma.enrollment.create({
    data:{
         userId,
    ...EnrollmentDto

    }
   
  })

  }


//   get all users that enrolled
async findAll(){
    return this.prisma.enrollment.findMany()
}

// get one user 

async findOne(id: number){
    return this.prisma.enrollment.findUnique({
        where: {
            id:id
        }
    });
}

//  update a user 
async updateOne(id: number, updateenrollment:UpdateEnrollmentDto){
    return this.prisma.enrollment.update({
    where:{
        id

    },
    data: updateenrollment

    });
    
}

//  delete enrollment
async remove(id:number) {
    return this.prisma.enrollment.delete({
    where:{
        id
    }
    });
}

}
