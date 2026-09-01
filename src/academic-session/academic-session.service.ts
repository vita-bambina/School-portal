import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class AcademicSessionService {
  constructor(private prisma: PrismaService) {}

  async create(sessiondto: CreateSessionDto) {
    const academicsession = await this.prisma.academicsession.create({
      data: sessiondto,
    });

    return academicsession;
  }

  async findAll() {
    const academicsessions = await this.prisma.academicsession.findMany({
      include: {
        semesters: true,
      },
    });

    return academicsessions;
  }

  async findOne(id: number) {
    const academicsession = await this.prisma.academicsession.findUnique({
      where: {
        id,
      },
      include: {
        semesters: true,
      },
    });

    if (!academicsession) {
      throw new NotFoundException('Academic session not found');
    }

    return academicsession;
  }

  async update(id: number, sessiondto: UpdateSessionDto) {
    await this.findOne(id);

    const academicsession = await this.prisma.academicsession.update({
      where: {
        id,
      },
      data:  sessiondto,
    });

    return academicsession;
  }

  async remove(id: number) {
    await this.findOne(id);

    const academicsession = await this.prisma.academicsession.delete({
      where: {
        id,
      },
    });

    return academicsession;
  }
}
