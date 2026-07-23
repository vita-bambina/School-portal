import { ApiProperty } from "@nestjs/swagger";
export class CreateStudentDto {

  @ApiProperty({example: '3', description: "the student userID from the table"})

 userId!: number;

  @ApiProperty({example: 'FSC/CSC/23009090', description: "The student identifer number/matric number"})

  studentNumber!: string;

  @ApiProperty({example: '1', description: "The department where the student is from"})

  departmentId!: number;

   @ApiProperty({example: '1', description: "The level the student is"})

  levelId!: number;
}
