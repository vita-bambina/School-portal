import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiOperation({ summary: 'School-admin should create a course' })
  @ApiResponse({ status: 201, description: 'Course Created Successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  //
  @Get()
  @ApiOperation({ summary: 'Get All Courses' })
  @ApiResponse({ status: 200, description: 'All Courses are here ' })
  findAll() {
    return this.courseService.findAll();
  }

  //
  @ApiOperation({ summary: 'Get Course by ID' })
  @ApiResponse({ status: 200, description: 'Course gotten by ID successful' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  // 

  @Patch(':id')
   @ApiOperation({ summary: 'Update a Course' })
  @ApiResponse({ status: 200, description: 'Course Update Successful' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  // 

  @Delete(':id')
   @ApiOperation({ summary: 'Delete a Course' })
  @ApiResponse({ status: 200, description: 'Course Deleted Successful' })
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
