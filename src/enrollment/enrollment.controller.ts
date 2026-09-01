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
import { User } from '../auth/decorator/user.decorator';
import { response } from 'express';

@ApiTags('enrollment')
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  //  it submits the entire form
  // @Post(':id/submit')
  // @ApiOperation({ summary: 'Submit enrollment' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Enrollment submitted successfully',
  // })
  // @UseGuards(JwtAuthGuard)
  // submit(
  //   @Req() req,
  //   @Param('id') id: string,
  //   @Body() EnrollmentDto: CreateEnrollmentDto,
  // ) {
  //   return this.enrollmentService.create(
  //     req.user.id,
  //     Number(id),
  //     EnrollmentDto,
  //   );
  // }

  // get user current enrollmet step, ec=xample, step one theyve completed

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getCurrentEnrollment(@User() user) {
    return this.enrollmentService.getEnrollment(user.id);
  }

  @Get('admin-applicants')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  getAdminApplicants(@Req() req) {
    console.log('ADMIN USER:', req.user);
    return this.enrollmentService.getAdminApplicants();
  }

  @Get(':id/revoke')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  @ApiOperation({ summary: 'Get a particular Student enrollment information' })
  @ApiResponse({
    status: 200,
    description: 'A Student that enrolled information',
  })
  findOne(@Param('id') id: string) {
    console.log('---------One request---------');

    return this.enrollmentService.findOne(Number(id));
  }

  // update a User

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update a particular user information' })
  @ApiResponse({ status: 200, description: 'Update Successful' })
  updateOne(@Body() updateEnrollmentDto: UpdateEnrollmentDto, @User() user) {
    console.log(updateEnrollmentDto, '-----the data----');
    return this.enrollmentService.updateOne(user.id, updateEnrollmentDto);
  }

  // Admin approves, student role
  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  @ApiOperation({ summary: 'Approve an enrollment' })
  @ApiResponse({ status: 200, description: 'Enrollment approved successfully' })
  approve(@Param('id') id: string) {
    return this.enrollmentService.approve(Number(id));
  }

  // Delete a student enrollment

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin, Role.Student)
  @ApiOperation({ summary: 'Delete a student that enrolled ' })
  @ApiResponse({
    status: 200,
    description: 'Student enrollment details deleted successful',
  })
  remove(@Param('id') id: string) {
    return this.enrollmentService.remove(Number(id));
  }

  //  the start route, like the stop 1, to strt it
  @Post('start')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Start enrollment process' })
  @ApiResponse({ status: 201, description: 'Enrollment draft created' })
  startEnrollment(@Req() req) {
    return this.enrollmentService.createDraft(req.user.id);
  }

  //  get all users controllers
  // @Get('/all_applicant')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.School_Admin)
  // @ApiOperation({ summary: 'Get all student that enrolled' })
  // @ApiResponse({ status: 201, description: 'All that enrolled information' })
  // findAll() {
  //   console.log('🔥 ALL APPLICANTS ROUTE HIT');
  //   return this.enrollmentService.findAll();
  // }
}
