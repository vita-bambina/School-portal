// import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEnrollmentDto {
 

    @ApiProperty({
        example: '328',
        description:'your jamb score'
    })

  jambScore!: number;

  @ApiProperty({
        example: '58.8',
        description:'Your waec score after calculating all'
    })

  waecAggregate!: number;

   @ApiProperty({
        example: '40009089234',
        description:'Your Nin number'
    })

  ninNumber!: string;
}
