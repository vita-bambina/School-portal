// import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
export class CreateEnrollmentDto {
  @ApiProperty({
    example: 'Blessing',
    description: 'your first name',
  })
  firstName!: string;
  //

  @ApiProperty({
    example: 'Israel',
    description: 'your last name',
  })
  lastName!: string;
  //
  @ApiProperty({
    example: 'marvelous',
    description: 'your last name',
  })
  otherName!: string;
  //
  @ApiProperty({
    example: 'MALE',
    enum: Gender,
  })
  gender!: Gender;
  //

  @ApiProperty({
    example: '2006-05-20',
    description: 'Date of birth',
  })
  dateOfBirth!: Date;

  //
  @ApiProperty({
    example: '08012345678',
    description: 'Phone number',
  })
  phone!: string;

  //
  @ApiProperty({
    example: 'Lagos Nigeria',
    description: 'Home address',
  })
  address!: string;

  //
  @ApiProperty({
    example: 3,
    description: 'Department the aspirant wants to apply for',
  })
  departmentId!: number;

  //

  @ApiProperty({
    example: 3,
    description: 'Faculty the aspirant wants to apply for',
  })
  facultyId!: number;
  
  //
  @ApiProperty({
    example: '12345678901',
    description: 'JAMB registration number',
  })
  jambRegistrationNumber!: string;

  //

  @ApiProperty({
    example: '328',
    description: 'your jamb score',
  })
  jambScore!: number;

  @ApiProperty({
    example: '58.8',
    description: 'Your waec score after calculating all',
  })
  waecAggregate!: number;

  @ApiProperty({
    example: '40009089234',
    description: 'Your Nin number',
  })
  ninNumber!: string;

  @ApiProperty({
    example: '/uploads/birth-certificate.png',
    description: 'Birth certificate image',
  })
  birthCertificate!: string;

  @ApiProperty({
    example: '/uploads/passport.png',
    description: 'Passport photograph',
  })
  passportPhoto!: string;

  //
  @ApiProperty({
    example: 'Nigeria',
    description: 'Applicant country',
  })
  country!: string;

  @ApiProperty({
    example: 'Lagos',
    description: 'Applicant state of origin',
  })
  stateOfOrigin!: string;

  @ApiProperty({
    example: 'Ikeja',
    description: 'Applicant LGA of origin',
  })
  Lga!: string;

  @ApiProperty({
    example: 'Lagos',
    description: 'Applicant current state of residence',
  })
  CurrentState!: string;

  @ApiProperty({
    example: 'Ikeja',
    description: 'Applicant current LGA of residence',
  })
  CurrentstateLGA!: string;

  referenceNumber!: string
}

