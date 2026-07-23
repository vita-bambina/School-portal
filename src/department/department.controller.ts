import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, 
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorator/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  //
  @Post()
  @ApiOperation({ summary: 'Create a department' })
  @ApiResponse({ status: 201, description: 'Department Created Successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.School_Admin)
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  //
  @Get()
  @ApiOperation({ summary: 'Get all Department' })
  @ApiResponse({ status: 200, description: 'Got all department Sucessfully' })
  findAll() {
    return this.departmentService.findAll();
  }

  //
  @Get(':id')
  @ApiOperation({ summary: 'Get department by ID' })
  @ApiResponse({
    status: 200,
    description: 'Gotten it',
  })
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  //
  @Patch(':id')
  @ApiOperation({ summary: 'Update Department' })
  @ApiResponse({ status: 200, description: 'update Successful' })
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  //
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Account' })
  @ApiResponse({ status: 200, description: 'Department Deleted' })
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
