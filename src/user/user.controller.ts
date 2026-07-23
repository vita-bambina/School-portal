import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt.guards';
// import { RolesGuard } from '../auth/guards/roles.guards';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({summary: 'Create User'})
  @ApiResponse({status: 201, description: 'user created successfully '})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  // 

  @Get()
    @ApiOperation({summary: 'Get all users '})
  @ApiResponse({status: 201, description: 'All users info gotten '})
  findAll() {
    return this.userService.findAll();
  }

  // 
  @Get(':id')
    @ApiOperation({summary: 'Get user by ID '})
  @ApiResponse({status: 201, description: 'one particular user info gotten '})
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  // 
  @Patch(':id')
    @ApiOperation({summary: 'Update user '})
  @ApiResponse({status: 201, description: 'update successful '})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
    @ApiOperation({summary: 'Delete user by ID '})
  @ApiResponse({status: 201, description: 'This user is no longer availabe  '})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
