import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFacultyDto {
  @ApiProperty({
    example: 'Faculy of Science',
    description: 'Faculty name',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'Fsc ',
    description: 'Faculty shortname ',
  })
  @IsString()
  @IsNotEmpty()
  code!: string;
}
