import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { StudentGuard } from '../auth/guards/student.guard';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('enrollment')
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @ApiOperation({ summary: 'Enroll Now' })
  @ApiResponse({ status: 201, description: 'Enrolled in Successful' })
  @UseGuards(JwtAuthGuard, StudentGuard)
  @Roles(Role.Student)
  create(@Req() req, @Body() EnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(req.user.id, EnrollmentDto);
  }

  //    get all users controllers
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  @ApiOperation({ summary: 'Get all student that enrolled' })
  @ApiResponse({ status: 201, description: 'All that enrolled information' })
  findAll() {
    return this.enrollmentService.findAll();
  }

  //   get one specific user controller

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
    @ApiOperation({ summary: 'Get a particular Student enrollment information' })
  @ApiResponse({ status: 200, description: 'A Student that enrolled information' })
  findOne(@Param('id') id: string) {
    return this.enrollmentService.findOne(Number(id));
  }

  // update a User

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin, Role.Student)
   @ApiOperation({ summary: 'Update a particular user information' })
  @ApiResponse({ status: 200, description: 'Update Successful' })
  updateOne(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.updateOne(Number(id), updateEnrollmentDto);
  }

  // Delete a student enrollment

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin, Role.Student)
   @ApiOperation({ summary: 'Delete a student that enrolled ' })
  @ApiResponse({ status: 200, description: 'Student enrollment details deleted successful' })
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(Number(id));
  }
}
