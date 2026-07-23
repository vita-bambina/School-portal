import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    example: 'Blessing',
    description: 'First name',
  })
  firstname!: string;
  @ApiProperty({
    example: 'Israel ',
    description: 'last name  ',
  })
  lastname!: string;

  @ApiProperty({
    example: 'bambina@gmail.com ',
    description: 'e-mail  ',
  })
  email!: string;

     @ApiProperty({
        example: 'olise ',
        description: "password  "
    })
  password!: string;

  
  role!: Role;
}
