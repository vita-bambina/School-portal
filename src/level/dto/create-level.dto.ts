
import { ApiProperty } from "@nestjs/swagger";
export class CreateLevelDto {

  @ApiProperty({example: '100level', description: 'class year/level'})
  name!: string;

    @ApiProperty({example: '1', description: 'The department in Which the level is'})
  
  departmentId!: number;
}
