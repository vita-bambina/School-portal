import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateStudentDto {
  @ApiProperty({
    example: '3',
    description: 'the student userID from the table',
  })
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @ApiProperty({
    example: 'FSC/CSC/23009090',
    description: 'The student identifer number/matric number',
  })
  @IsString()
  @IsNotEmpty()
  studentNumber!: string;

  @ApiProperty({
    example: '1',
    description: 'The department where the student is from',
  })
  @IsNumber()
  @IsNotEmpty()
  departmentId!: number;

  @ApiProperty({ example: '1', description: 'The level the student is' })
  @IsNumber()
  @IsNotEmpty()
  levelId!: number;

  @ApiProperty({
    example: 1,
    description: 'Academic session ID',
  })
  @IsNumber()
  @IsNotEmpty()
  semesterId!: number;
}
