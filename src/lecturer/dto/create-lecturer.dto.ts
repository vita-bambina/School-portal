import { ApiProperty } from '@nestjs/swagger';

export class CreateLecturerDto {
  @ApiProperty({
    example: 'Dr',
    description: 'Title of the lecturer',
  })
  title!: string;

  @ApiProperty({
    example: 'John',
    description: 'Lecturer first name',
  })
  firstname!: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Lecturer last name',
  })
  lastname!: string;

  @ApiProperty({
    example: 'john.doe@school.com',
    description: 'Lecturer email',
  })
  email!: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Password created by the admin for the lecturer',
  })
  password!: string;

  @ApiProperty({
    example: 1,
    description: 'Faculty ID of the lecturer',
  })
  facultyId!: number;
}