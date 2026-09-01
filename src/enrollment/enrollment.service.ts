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

  async create(userId: number, Id: number, EnrollmentDto: CreateEnrollmentDto) {
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

    const referenceNumber = `ASP_${String(Id).padStart(3, '0')}`;

    return this.prisma.enrollment.update({
      where: {
        id: Id,
        userId,
      },
      data: {
        ...EnrollmentDto,
        referenceNumber,
        status,
        currentStep: 4,
      },
    });
  }

  //   get all users that enrolled
  // async findAll() {
  //   return this.prisma.enrollment.findMany();
  // }

  // get one user

  async findOne(id: number) {
    console.log('---------UserId_--------------:', id);
    return this.prisma.enrollment.findUnique({
      where: {
        id: id,
      },
    });
  }

  //  update a user
  async updateOne(userId: number, updateenrollmentData: UpdateEnrollmentDto) {
    // Check if the enrollment exists
    const { isSubmit, ...payload } = updateenrollmentData;

    const updateenrollment = {
      ...payload,
      status: isSubmit
        ? EnrollmentStatus.PENDING
        : EnrollmentStatus.IN_PROGRESS,
    };
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId,
      },
    });

    // If it doesn't exist → CREATE
    if (!enrollment) {
      return this.prisma.enrollment.create({
        data: {
          ...updateenrollment,
          userId,
        },
      });
    }
    // If it exists → PATCH
    const data = Object.fromEntries(
      Object.entries(updateenrollment).filter(
        ([_, value]) => value !== undefined && value !== null,
      ),
    );

    const updatedForm = this.prisma.enrollment.update({
      where: {
        userId,
      },
      data,
    });

    return updatedForm;
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
      include: {
        faculty: true,
        session: true,
        department: true,
      },
    });

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }
    if (!enrollment.departmentId) {
      throw new Error('Department is required before approval');
    }

    if (!enrollment.facultyId) {
      throw new Error('Faculty required before approval');
    }
    if (!enrollment.session) {
      throw new Error('Session required before approval');
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

    const sessionYear = enrollment.session.year;

    const firstYear = sessionYear.substring(2, 4);

    const student = await this.prisma.student.create({
      data: {
        userId: enrollment.userId,
        departmentId: enrollment.departmentId,
        levelId: level.id,
      },
    });
    const studentIdNumber = String(student.id).padStart(4, '0');

    const departmentIdNumber = String(enrollment.departmentId).padStart(2, '0');

    const studentNumber =
      `${enrollment.faculty!.code}/` +
      `${enrollment.department!.code}/` +
      `${firstYear}` +
      `${studentIdNumber}` +
      `${departmentIdNumber}`;

    console.log('--------matric number------:', studentNumber);
    console.log('-------enrollment user id-----------:', enrollment.userId);

    await this.prisma.student.update({
      where: {
        id: student.id,
      },
      data: {
        studentNumber: studentNumber,
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
  async getEnrollment(userId: number) {
    return this.prisma.enrollment.findFirst({
      where: {
        userId,
      },
    });
  }

  async createDraft(userId: number) {
    console.log('GETTING ENROLLMENT FOR USER:', userId);

    return this.prisma.enrollment.findUnique({
      where: {
        userId,
      },
    });
  }

  async getAdminApplicants() {
    return this.prisma.enrollment.findMany({
      select: {
        id: true,
        referenceNumber: true,
        firstName: true,
        lastName: true,
        otherName: true,
        status: true,
        currentStep: true,
      },
    });
  }
}
