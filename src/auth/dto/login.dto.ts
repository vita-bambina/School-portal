import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'bambina@gmail.com',
    description: ' email you used to register ',
  })
  email!: string;

  @ApiProperty({
    example: 'olise',
    description: ' same password you used to register ',
  })
  password!: string;
}
