import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { StudentGuard } from '../auth/guards/student.guard';
import { Roles } from '../auth/decorator/roles.decorator';

import { Role } from '@prisma/client';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Admin assigns user as student
  @Post()
  @ApiOperation({ summary: 'Admin Adds Student' })
  @ApiResponse({ status: 201, description: 'Student Added Successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  // View all students
  @Get('/getall')
  @ApiOperation({ summary: 'Get all student ' })
  @ApiResponse({ status: 200, description: 'gotten all students successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  findAll() {
    return this.studentService.findAll();
  }

  // student courses
  // Student views their courses
  @Get('mycourses')
  @UseGuards(JwtAuthGuard, StudentGuard)
  @Roles(Role.Student)
  getMyCourses(@Req() req: any) {
    return this.studentService.getMyCourses(req.user.id);
  }
  //
  @Get('mymaterials')
  @UseGuards(JwtAuthGuard, StudentGuard)
  getMyCourseMaterials(@Req() req: any) {
    console.log('MY MATERIALS USER:', req.user);

    return this.studentService.getMyCourseMaterials(req.user.id);
  }
  //
  @Get('me')
  @UseGuards(JwtAuthGuard, StudentGuard)
  getMyProfile(@Req() req) {
    console.log('ME ROUTE HIT');
    console.log('REQ USER:', req.user);
    return this.studentService.getMyProfile(req.user.id);
  }

  // View one student
  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID ' })
  @ApiResponse({ status: 200, description: 'A particular student info gotten' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  // Update student information
  @Patch(':id')
  @ApiOperation({ summary: 'Update student information' })
  @ApiResponse({ status: 200, description: 'Update successful' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  // Delete student profile
  @Delete(':id')
  @ApiOperation({ summary: 'Delete A student' })
  @ApiResponse({ status: 200, description: 'Student Account deleted ' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
  //
}
