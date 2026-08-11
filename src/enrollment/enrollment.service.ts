import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Role, EnrollmentStatus } from '@prisma/client';
// import { EnrollmentStatus } from '@prisma/client';

// import { Roles } from '../auth/decorator/roles.decorator';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, EnrollmentDto: CreateEnrollmentDto) {
    const department = await this.prisma.department.findUnique({
      where: {
        id: EnrollmentDto.departmentId,
      },
    });

    if (!department) {
      throw new Error('Department not found');
    }

    const qualified =
      EnrollmentDto.jambScore >= department.jambCutOff &&
      EnrollmentDto.waecAggregate >= department.minimumWaecAggregate;

    const status = qualified ? 'PENDING' : 'REJECTED';

    // approve

    const lastEnrollment = await this.prisma.enrollment.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    const nextNumber = lastEnrollment ? lastEnrollment.id + 1 : 1;

    const referenceNumber = `ASP_${String(nextNumber).padStart(3, '0')}`;

    return this.prisma.enrollment.create({
      data: {
        userId,
        ...EnrollmentDto,
        referenceNumber,
        status,
      },
    });
  }

  //   get all users that enrolled
  async findAll() {
    return this.prisma.enrollment.findMany();
  }

  // get one user

  async findOne(id: number) {
    return this.prisma.enrollment.findUnique({
      where: {
        id: id,
      },
    });
  }

  //  update a user
  async updateOne(id: number, updateenrollment: UpdateEnrollmentDto) {
    return this.prisma.enrollment.update({
      where: {
        id,
      },
      data: updateenrollment,
    });
  }

  //  delete enrollment
  async remove(id: number) {
    return this.prisma.enrollment.delete({
      where: {
        id,
      },
    });
  }

  //  Approve student

  async approve(id: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        id,
      },
    });

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }
    if (!enrollment.departmentId) {
      throw new Error('Department is required before approval');
    }
    const level = await this.prisma.level.findFirst({
      where: {
        name: '100 Level',
        departmentId: enrollment.departmentId,
      },
    });

    if (!level) {
      throw new Error('100 Level not found');
    }

    await this.prisma.student.create({
      data: {
        userId: enrollment.userId,
        departmentId: enrollment.departmentId,
        levelId: level.id,
      },
    });

    await this.prisma.user.update({
      where: {
        id: enrollment.userId,
      },
      data: {
        role: Role.Student,
      },
    });

    return this.prisma.enrollment.update({
      where: {
        id,
      },
      data: {
        status: EnrollmentStatus.ADMITTED,
      },
    });
  }
  // get current update like enrollment step
  async getCurrentEnrollment(userId: number) {
    return this.prisma.enrollment.findFirst({
      where: {
        userId: userId,
        status: EnrollmentStatus.IN_PROGRESS,
      },
    });
  }

  // draft for the currentstep
  async createDraft(userId: number) {
  return this.prisma.enrollment.create({
    data: {
      userId,
      currentStep: 1,
      status: EnrollmentStatus.IN_PROGRESS,
    },
  });
}
}
