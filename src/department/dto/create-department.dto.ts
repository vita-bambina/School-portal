import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
    @ApiProperty({
        example: 'Computer Science',
        description: "Department name"
    })
    name! : string;
     @ApiProperty({
        example: 'CSC ',
        description: "Department shortname "
    })
    code!: string;

     @ApiProperty({example: '1', description: "faculty the department is under"})

  facultyId!: number;
}
