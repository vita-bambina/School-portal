import { ApiProperty } from '@nestjs/swagger';

export class AssignlecturerDto {
  @ApiProperty({ example: '1', description: 'facultyIdnumber' })
  facultyId!: number;
}
