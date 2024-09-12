import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from './aws-s3.service';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('aws-s3')
export class AwsS3Controller {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  @Roles('public')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.awsS3Service.uploadFile(file);
  }

  @Roles('public')
  @Get('image/:fileName')
  @UseInterceptors(FileInterceptor('file'))
  async getImage(
    @Param() { fileName }: { fileName: string },
    @Res() res: Response,
  ) {
    const imageData = await this.awsS3Service.getFile(fileName);
    res.send(imageData);
  }
}
