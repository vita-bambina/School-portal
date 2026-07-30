import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  @ApiOperation({ summary: 'Create/ Add Faculty' })
  @ApiResponse({ status: 201, description: 'Faculty Added Successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  create(@Body() FacultyDto: CreateFacultyDto) {
    return this.facultyService.create(FacultyDto);
  }

  //
  @Get()
  @ApiOperation({ summary: 'Get All Faculties' })
  @ApiResponse({ status: 201, description: 'All faculties information gotten' })
  findAll() {
    return this.facultyService.findAll();
  }

  //

  @ApiOperation({ summary: 'Get Faculty by Id' })
  @ApiResponse({ status: 200, description: 'Faculty gotten by Id successful' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facultyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Faculty' })
  @ApiResponse({ status: 200, description: 'Faculty Update Successful' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  update(@Param('id') id: string, @Body() updateFacultyDto: UpdateFacultyDto) {
    return this.facultyService.update(+id, updateFacultyDto);
  }

  //

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Faculty' })
  @ApiResponse({ status: 200, description: 'Faculty Deleted Successful' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  remove(@Param('id') id: string) {
    return this.facultyService.remove(+id);
  }
}
