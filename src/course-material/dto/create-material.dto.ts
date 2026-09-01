import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateSlideDto {
  @ApiProperty({
    example: 'introduction to programming slide',
    description: 'slide name',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    example: 'introduction to this',
    description: 'course-material file name',
  })
   @IsString()
  @IsNotEmpty()
  file!: string;
 
  @ApiProperty({
    example: '3',
    description: 'lecturer courseid'

  })
   @IsNumber()
  @IsNotEmpty()
    lecturerCourseId!: number;
}
