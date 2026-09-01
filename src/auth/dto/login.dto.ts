import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'bambina@gmail.com',
    description: ' email you used to register ',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'olise',
    description: ' same password you used to register ',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
