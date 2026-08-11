import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import { AssignlecturerDto } from './dto/Assign-lecturer.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LecturerService {
  constructor(private prisma: PrismaService) {}

  async create(createlecturerDto: CreateLecturerDto) {
    const lastLecturer = await this.prisma.lecturer.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    const nextNumber = lastLecturer ? lastLecturer.id + 1 : 1;

    const staffId = `STF/${String(nextNumber).padStart(3, '0')}`;

    // Hash the password the admin created
    const hashedPassword = await bcrypt.hash(createlecturerDto.password, 10);

    // Create the User account first
    const user = await this.prisma.user.create({
      data: {
        firstname: createlecturerDto.firstname,
        lastname: createlecturerDto.lastname,
        email: createlecturerDto.email,
        password: hashedPassword,
        role: 'Lecturer',
      },
    });

    // Now create the Lecturer and connect it to the User
    const lecturer = await this.prisma.lecturer.create({
      data: {
        userId: user.id,
        title: createlecturerDto.title,
        staffId,
        facultyId: createlecturerDto.facultyId,
      },
    });

    return lecturer;
  }

  // find all lecturers
  async findAll() {
    return this.prisma.lecturer.findMany({
      include: {
        user: true,
        faculty: true,
        courses: {
          include: {
            course: {
              include: {
                department: true,
              },
            },
          },
        },
      },
    });
  }

  //  find one lecturer
  async findOne(id: number) {
    return this.prisma.lecturer.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
        faculty: true,
        level: true,
      },
    });
  }

  // update a lecturer

  async update(id: number, updatelecturerDto: UpdateLecturerDto) {
    return this.prisma.lecturer.update({
      where: {
        id,
      },

      data: updatelecturerDto,
    });
  }

  // delelte a lecturer

  async remove(id: number) {
    return this.prisma.lecturer.delete({
      where: {
        id,
      },
    });
  }

  //  Assign lecturer

  async assign(id: number, assignLecturerDto: AssignlecturerDto) {
    return this.prisma.lecturer.update({
      where: {
        id,
      },
      data: {
        facultyId: assignLecturerDto.facultyId,
      },
      include: {
        user: true,
        faculty: true,
        level: true,
      },
    });
  }
}
