import { ApiProperty } from '@nestjs/swagger';

export class CreateLecturerDto {
  @ApiProperty({ example: '1', description: 'lecturers ID on the users table' })
  userId!: number;

    @ApiProperty({ example: 'Prof/Mrs/Dr/Mr/Miss', description: 'Title they bear' })
  title!: string;

   @ApiProperty({ example: 'CSC345-34', description: 'Number they are given for identity by the deparment they teach/work in' })
  staffId!: string;

     @ApiProperty({ example: '1', description: 'The department they teach' })

  departmentId!: number;

    @ApiProperty({ example: '1', description: 'The level They teach' })

  levelId!: number;
}
