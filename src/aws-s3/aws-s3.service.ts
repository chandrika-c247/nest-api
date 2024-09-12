import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  constructor(private configService: ConfigService) {}
  AWS_S3_BUCKET = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  s3 = new AWS.S3({
    accessKeyId: this.configService.get<string>('AWS_S3_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get<string>('AWS_S3_SECRET_ACCESS_KEY'),
  });

  async uploadFile(file: any) {
    console.log(file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async getFile(fileName: any) {
    return await this.s3
      .getObject({
        Bucket: this.AWS_S3_BUCKET,
        Key: fileName,
      })
      .promise();
  }

  async s3_upload(
    file: Express.Multer.File,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
      throw new HttpException(e.message, HttpStatus.BAD_GATEWAY);
    }
  }
}
