import { Module } from '@nestjs/common';
import { AspirantService } from './aspirant.service';
import { AspirantController } from './aspirant.controller';
import { PrismaModule } from '../Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AspirantService],
  controllers: [AspirantController],
})
export class AspirantModule {}
