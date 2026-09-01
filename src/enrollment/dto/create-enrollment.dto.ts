// import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({
    example: 'Blessing',
    description: 'your first name',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Israel',
    description: 'your last name',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'marvelous',
    description: 'your last name',
  })
  @IsString()
  otherName: string;

  @ApiProperty({
    example: 'MALE',
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: '2006-05-20',
    description: 'Date of birth',
  })
  @IsString()
  dateOfBirth: string;

  @ApiProperty({
    example: '08012345678',
    description: 'Phone number',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Lagos Nigeria',
    description: 'Home address',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: 3,
    description: 'Department the aspirant wants to apply for',
  })
  @IsNumber()
  departmentId: number;

  @ApiProperty({
    example: 3,
    description: 'Faculty the aspirant wants to apply for',
  })
  @IsNumber()
  facultyId: number;

  @ApiProperty({
    example: '12345678901',
    description: 'JAMB registration number',
  })
  @IsString()
  jambRegistrationNumber: string;

  //

  @ApiProperty({
    example: '328',
    description: 'your jamb score',
  })
  @IsNumber()
  jambScore: number;

  @ApiProperty({
    example: '58.8',
    description: 'Your waec score after calculating all',
  })
  @IsNumber()
  waecAggregate: number;

  @ApiProperty({
    example: '40009089234',
    description: 'Your Nin number',
  })
  @IsString()
  ninNumber: string;

  @ApiProperty({
    example: '/uploads/birth-certificate.png',
    description: 'Birth certificate image',
  })
  @IsString()
  birthCertificate: string;

  @ApiProperty({
    example: '/uploads/passport.png',
    description: 'Passport photograph',
  })
  @IsString()
  passportPhoto: string;

  @ApiProperty({
    example: 'Nigeria',
    description: 'Applicant country',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: 'Lagos',
    description: 'Applicant state of origin',
  })
  @IsString()
  stateOfOrigin: string;

  @ApiProperty({
    example: 'Ikeja',
    description: 'Applicant LGA of origin',
  })
  @IsString()
  lga: string;

  @ApiProperty({
    example: 'Lagos',
    description: 'Applicant current state of residence',
  })
  @IsString()
  currentState: string;

  @ApiProperty({
    example: 'Ikeja',
    description: 'Applicant current LGA of residence',
  })
  @IsString()
  currentstateLGA: string;

  @ApiProperty({
    example: 'true || false',
    description: 'Checks if the form is on the last step',
  })
  @IsBoolean()
  isSubmit: boolean;

  @IsString()
  jambResult: string;

  @IsString()
  waecResult: string;
}
