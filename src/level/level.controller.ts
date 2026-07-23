import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('level')
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  @ApiOperation({ summary: 'Add a level' })
  @ApiResponse({ status: 201, description: 'Level Addedd Successfuly' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  //

  @Get()
  @ApiOperation({ summary: 'Get All levels' })
  @ApiResponse({ status: 200, description: 'Gotten All levels' })
  findAll() {
    return this.levelService.findAll();
  }

  //
  @Get(':id')
  @ApiOperation({ summary: 'Get level by ID' })
  @ApiResponse({ status: 200, description: 'Gotten a partivular Id' })
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(+id);
  }

  // 
  @Patch(':id')
   @ApiOperation({ summary: 'Update a level' })
  @ApiResponse({ status: 200, description: 'Update Successful' })
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(+id, updateLevelDto);
  }

  // Delete a level
  @Delete(':id')
   @ApiOperation({ summary: 'Delete level' })
  @ApiResponse({ status: 200, description: 'level deleted Successfully' })
  remove(@Param('id') id: string) {
    return this.levelService.remove(+id);
  }
}
