import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, isString } from 'class-validator';

export class CreateLecturerDto {
  @ApiProperty({
    example: 'Dr',
    description: 'Title of the lecturer',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'John',
    description: 'Lecturer first name',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Lecturer last name',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'john.doe@school.com',
    description: 'Lecturer email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Password created by the admin for the lecturer',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 1,
    description: 'Faculty ID of the lecturer',
  })
  @IsNumber()
  @IsNotEmpty()
  facultyId: number;
}
