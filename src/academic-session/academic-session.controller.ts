import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorator/roles.decorator';
import {AcademicSessionService} from './academic-session.service'
import { Role } from '@prisma/client';

@Controller('academic-session')
export class AcademicSessionController {
  constructor(
    private readonly academicSessionService: AcademicSessionService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  async create(@Body() createSessionDto: CreateSessionDto) {
     console.log("SESSION DATA RECEIVED:", createSessionDto);
    return this.academicSessionService.create(createSessionDto);
  }

  @Get()
  async findAll() {
    return this.academicSessionService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.academicSessionService.findOne(id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.academicSessionService.update(+id, updateSessionDto);
  }

  // Delete academic session
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  remove(@Param('id') id: string) {
    return this.academicSessionService.remove(+id);
  }
}
