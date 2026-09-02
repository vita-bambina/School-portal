import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    console.log('USER DATA:', createUserDto);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    let user;

    try {
      user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      }

      throw error;
    }
    if (createUserDto.role === Role.Lecturer) {
      await this.prisma.lecturer.create({
        data: {
          userId: user.id,
          staffId: `STF/${String(user.id).padStart(3, '0')}`,
        },
      });
    }
    if (user.role === Role.Aspirant) {
      const enrollment = await this.prisma.enrollment.create({
        data: {
          userId: user.id,
          status: 'IN_PROGRESS',
          currentStep: 1,
        },
      });

      const referenceNumber = `ASP-${String(enrollment.id).padStart(5, '0')}`;

      await this.prisma.enrollment.update({
        where: {
          id: enrollment.id,
        },
        data: {
          referenceNumber,
        },
      });
    }

    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  // Get one user by id
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  // Update a user
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  // Delete a user
  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
