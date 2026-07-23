import { Module } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { LecturerController } from './lecturer.controller';
import { PrismaModule } from '../Prisma/prisma.module';

@Module({
   imports: [PrismaModule],
  controllers: [LecturerController],
  providers: [LecturerService],
})
export class LecturerModule {}
