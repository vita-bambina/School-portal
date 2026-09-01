import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    example: 'Computer Science',
    description: 'Department name',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;
  @ApiProperty({
    example: 'CSC ',
    description: 'Department shortname ',
  })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: '1', description: 'faculty the department is under' })
  @IsNumber()
  @IsNotEmpty()
  facultyId!: number;

  @ApiProperty({
    example: 280,
    description: 'Applicant JAMB score (0 - 400)',
  })
  @IsNumber()
  @IsNotEmpty()
  jambCutOff!: number;

  @ApiProperty({
    example: 75.5,
    description: 'Applicant WAEC aggregate score',
  })
  @IsNumber()
  @IsNotEmpty()
  minimumWaecAggregate!: number;
}
