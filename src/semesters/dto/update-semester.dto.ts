import { PartialType } from '@nestjs/mapped-types';
import { createSemester } from './create-semester.dto';

export class UpdateSemesterDto extends PartialType(createSemester) {}
