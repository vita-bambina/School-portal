import { ApiProperty } from '@nestjs/swagger';

export class CreateFacultyDto {
    @ApiProperty({
        example: 'Faculy of Science',
        description: "Faculty name"
    })
    name! : string;
    
}
