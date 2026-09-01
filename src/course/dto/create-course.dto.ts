import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateCourseDto {
  @ApiProperty({
    example: 'Intoduction to programming',
    description: 'Course Name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'CSC 312',
    description: 'Course code',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    example: 'CSC 312',
    description: 'Course code',
  })
  @IsNotEmpty()
  @IsNumber()
  courseunit: number;

  @ApiProperty({
    example: '1',
    description: 'Which department does the course fall under',
  })
  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @ApiProperty({
    example: '1',
    description: 'What level is taking the course',
  })
  @IsNotEmpty()
  @IsNumber()
  levelId: number;

  @ApiProperty({
    type: [Number],
    description: 'IDs of lecturers assigned to this course',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  lecturerIds: number[];

  @ApiProperty({
    example: 1,
    description: 'Academic session ID',
  })
  @IsNotEmpty()
  @IsNumber()
  semesterId: number;
}
