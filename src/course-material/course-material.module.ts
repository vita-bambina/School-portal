import { Module } from '@nestjs/common';
import { CourseMaterialService } from './course-material.service';
import { CourseMaterialController } from './course-material.controller';
import { PrismaModule } from '../Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseMaterialController],
  providers: [CourseMaterialService],
})
export class CourseMaterialModule {}
