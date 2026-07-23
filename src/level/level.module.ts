import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { PrismaModule } from '../Prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [
    LevelController
  ],
  providers: [
    LevelService
  ],
})
export class LevelModule {}