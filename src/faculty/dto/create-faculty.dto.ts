import { ApiProperty } from '@nestjs/swagger';

export class CreateFacultyDto {
    @ApiProperty({
        example: 'Faculy of Science',
        description: "Faculty name"
    })
    name! : string;
    
      @ApiProperty({
        example: 'Fsc ',
        description: "Faculty shortname "
    })
    code!: string;

}
