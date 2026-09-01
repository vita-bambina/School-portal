import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import { isEnum, IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    example: 'Blessing',
    description: 'First name',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @ApiProperty({
    example: 'Israel ',
    description: 'last name  ',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'bambina@gmail.com ',
    description: 'e-mail  ',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'olise ',
    description: 'password  ',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
