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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { LecturerService } from './lecturer.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import { AssignlecturerDto } from './dto/Assign-lecturer.dto';

import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorator/roles.decorator';

import { Role } from '@prisma/client';

@ApiTags('lecturer')
@Controller('lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  // Create lecturer - only School Admin
  @Post()
  @ApiOperation({ summary: 'Admin Adds Lecturer' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  @ApiResponse({
    status: 200,
    description: 'lecturer created successfully',
  })
  create(@Body() createLecturerDto: CreateLecturerDto) {
    return this.lecturerService.create(createLecturerDto);
  }

  // Get all lecturers
  @Get()
  @ApiOperation({ summary: 'Get all Lecturers' })
  @ApiResponse({ status: 200, description: 'Gotten All users' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  findAll() {
    return this.lecturerService.findAll();
  }

  // Get one lecturer
  @Get(':id')
  @ApiOperation({ summary: 'Get lecturer by ID' })
  @ApiResponse({ status: 200, description: 'lecturers gotten' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  findOne(@Param('id') id: string) {
    return this.lecturerService.findOne(+id);
  }

  // Update lecturer
  @Patch(':id')
  @ApiOperation({ summary: 'update lecturers' })
  @ApiResponse({ status: 200, description: 'lecturer info updated ' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  update(
    @Param('id') id: string,

    @Body() updateLecturerDto: UpdateLecturerDto,
  ) {
    return this.lecturerService.update(+id, updateLecturerDto);
  }

  // Delete lecturer
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lecturer Information' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  @ApiResponse({
    status: 200,
    description: 'lecturers Account deleted Successfully',
  })
  remove(@Param('id') id: string) {
    return this.lecturerService.remove(+id);
  }

  // Assign lecturer
  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign lecturer to a faculty and level' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  @ApiResponse({
    status: 200,
    description: 'Lecturer assigned successfully',
  })
  assign(
    @Param('id') id: string,
    @Body() assignLecturerDto: AssignlecturerDto,
  ) {
    return this.lecturerService.assign(+id, assignLecturerDto);
  }
}
