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

  @ApiProperty({
  example: 280,
  description: 'Applicant JAMB score (0 - 400)'
})
jambCutOff!: number;


@ApiProperty({
  example: 75.5,
  description: 'Applicant WAEC aggregate score'
})
minimumWaecAggregate !: number;
}
