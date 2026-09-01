import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateLevelDto {
  @ApiProperty({ example: '100level', description: 'class year/level' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: '1',
    description: 'The department in Which the level is',
  })
  @IsNumber()
  @IsNotEmpty()
  departmentId!: number;
}
