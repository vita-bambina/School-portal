import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';

@Injectable()
export class AspirantService {
  constructor(private prisma: PrismaService) {}
  //  get profile
  async getProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstname: true,
        lastname: true,
        email: true,
        role: true,
      },
    });
  }
  //  get all faculties
  async getFaculties() {
    return this.prisma.faculty.findMany();
  }

  //
  //  Get departments under a faculty
  async getDepartments(facultyId: number) {
    return this.prisma.department.findMany({
      where: {
        facultyId,
      },
      select: {
        id: true,
        name: true,
        code: true,
      },
    });
  }

  //  Get department admission requirements
  async getDepartmentRequirements(departmentId: number) {
    return this.prisma.department.findUnique({
      where: {
        id: departmentId,
      },
      select: {
        name: true,
        jambCutOff: true,
        minimumWaecAggregate: true,
      },
    });
  }

  // Get aspirant application
  async getMyApplication(userId: number) {
    return this.prisma.enrollment.findUnique({
      where: {
        userId,
      },
      include: {
        department: true,
      },
    });
  }

  // Get application status
  async getApplicationStatus(userId: number) {
    return this.prisma.enrollment.findUnique({
      where: {
        userId,
      },
      select: {
        status: true,
      },
    });
  }

  //  Update application details
  async updateApplication(userId: number, data: any) {
    return this.prisma.enrollment.update({
      where: {
        userId,
      },
      data,
    });
  }

  // Get admission result
  async getAdmissionResult(userId: number) {
    return this.prisma.enrollment.findUnique({
      where: {
        userId,
      },
      select: {
        status: true,
        department: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
