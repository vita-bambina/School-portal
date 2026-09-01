import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateSessionDto {
  @ApiProperty({
    example: '05-07-2026',
    description: 'The year and the date the Session starts',
  })
  @IsString()
  @IsNotEmpty()
  startdate!: string;

  @ApiProperty({
    example: '2026/2027',
    description: 'The year the Session starts and ends',
  })
  @IsString()
  @IsNotEmpty()
  year!: string;

  @ApiProperty({
    example: '05-07-2027',
    description: 'The year and the date the Session ends',
  })
  @IsString()
  @IsNotEmpty()
  enddate!: string;
}
