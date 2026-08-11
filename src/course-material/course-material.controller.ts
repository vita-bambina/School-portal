import { Controller } from '@nestjs/common';
import { Body, Get, Param, Patch, Post, Delete } from '@nestjs/common';

import { CourseMaterialService } from './course-material.service';
import { CreateSlideDto } from './dto/create-material.dto';
import { UpdateSlide } from './dto/update-material.dto';

@Controller('course-material')
export class CourseMaterialController {
  constructor(private readonly courseMaterialService: CourseMaterialService) {}

  @Post()
  create(@Body() dto: CreateSlideDto) {
    return this.courseMaterialService.create(dto);
  }

  @Get()
  findAll() {
    return this.courseMaterialService.findAll();
  }

  @Get('id')
  findOne(@Param('id') id: string) {
    return this.courseMaterialService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() changes: UpdateSlide) {
    return this.courseMaterialService.update(Number(id), changes);
  }

  @Delete('id')
  delete(@Param('id') id: string) {
    return this.courseMaterialService.delete(Number(id));
  }
}
