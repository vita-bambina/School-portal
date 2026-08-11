import { ApiProperty } from '@nestjs/swagger';
export class CreateSlideDto {
  @ApiProperty({
    example: 'introduction to programming slide',
    description: 'slide name',
  })
  title!: string;

  @ApiProperty({
    example: 'introduction to this',
    description: 'course-material file name',
  })
  file!: string;
 
  @ApiProperty({
    example: '3',
    description: 'lecturer id'

  })
    lecturerCourseId!: number;
}
