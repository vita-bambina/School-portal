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

import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorator/roles.decorator';

import { Role } from '@prisma/client';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('student')
@Controller('student')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.School_Admin)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Admin assigns user as student
  @Post()
  @ApiOperation({ summary: 'Admin Adds Student' })
  @ApiResponse({ status: 201, description: 'Student Added Successfully' })
  @Roles(Role.School_Admin)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  // View all students
  @Get()
   @ApiOperation({ summary: 'Get all student ' })
  @ApiResponse({ status: 200, description: 'gotten all students successfully' })
  @Roles(Role.School_Admin)
  findAll() {
    return this.studentService.findAll();
  }

  // View one student
  @Get(':id')
   @ApiOperation({ summary: 'Get student by ID ' })
  @ApiResponse({ status: 200, description: 'A particular student info gotten' })
  @Roles(Role.School_Admin)
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  // Update student information
  @Patch(':id')
   @ApiOperation({ summary: 'Update student information' })
  @ApiResponse({ status: 200, description: 'Update successful' })
  @Roles(Role.School_Admin)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  // Delete student profile
  @Delete(':id')
   @ApiOperation({ summary: 'Delete A student' })
  @ApiResponse({ status: 200, description: 'Student Account deleted ' })
  @Roles(Role.School_Admin)
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
