import { PartialType } from '@nestjs/mapped-types';
import { CreateSlideDto } from './create-material.dto';

export class UpdateSlide extends PartialType(CreateSlideDto) {}
