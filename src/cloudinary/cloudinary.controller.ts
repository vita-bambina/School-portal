import { Controller } from '@nestjs/common';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { CloudinaryService } from './cloudinary.service';
@Controller('upload')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {
    
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any) {
    return this.cloudinaryService.uploadFile(file);
  }
}
