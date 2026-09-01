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

import { SemestersService } from './semesters.service';
import { createSemester } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorator/roles.decorator';

import { Role } from '@prisma/client';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('semester')
@Controller('semester')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.School_Admin)
export class SemestersController {
  constructor(private readonly SemestersService: SemestersService) {}
  @Post()
  @ApiOperation({ summary: 'Admin Adds Semester' })
  @ApiResponse({ status: 201, description: 'Student Added Successfully' })
  @Roles(Role.School_Admin)
  create(@Body() createSemester: createSemester) {
    console.log('SESSION DATA RECEIVED:', createSemester);
    return this.SemestersService.create(createSemester);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Semester ' })
  @ApiResponse({ status: 200, description: 'gotten all students successfully' })
  @Roles(Role.School_Admin)
  findAll() {
    return this.SemestersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get semester by ID ' })
  @ApiResponse({
    status: 200,
    description: 'A particular semester info gotten',
  })
  @Roles(Role.School_Admin)
  findOne(@Param('id') id: string) {
    return this.SemestersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update semester information' })
  @ApiResponse({ status: 200, description: 'Update successful' })
  @Roles(Role.School_Admin)
  update(
    @Param('id') id: string,
    @Body() UpdateSemesterDto: UpdateSemesterDto,
  ) {
    return this.SemestersService.update(+id, UpdateSemesterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete A semestert' })
  @ApiResponse({ status: 200, description: 'Semester Account deleted ' })
  @Roles(Role.School_Admin)
  remove(@Param('id') id: string) {
    return this.SemestersService.remove(+id);
  }
}
