import { ApiProperty } from '@nestjs/swagger';
export class CreateCourseDto {
  @ApiProperty({
    example: 'Intoduction to programming',
    description: 'Course Name',
  })
  name!: string;

  @ApiProperty({
    example: 'CSC 312',
    description: 'Course code',
  })
  code!: string;

  @ApiProperty({
    example: '1',
    description: 'Which department does the course fall under',
  })
  departmentId!: number;

   @ApiProperty({
    example: '1',
    description: 'What level is taking the course',
  })

  levelId!: number;
}
