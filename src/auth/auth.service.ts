import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/schemas/users.schema';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}
  async signIn(email: string, pass: string) {
    const userData = await this.userModel
      .findOne({ email: email, password: pass })
      .exec();
    if (userData) {
      const payload = {
        sub: userData._id,
        username: userData.email,
        email: userData.email,
      };
      return {
        message: 'Loged in successfully!!',
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException(
        'Sorry, invalid credential',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async signUp(createUserDto: any) {
    const userData = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (userData) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    } else {
      const createdUser = await this.userModel.create(createUserDto);
      await this.mailService.sendUserConfirmation({
        to: 'chandu@mailinator.com',
        subject: 'Welcome to Nice App! Confirm your Email',
        template: 'confirmation',
        name: '',
        context: {
          name: 'User',
          url: `example.com/auth/confirm?token=`,
        },
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Signup successfully',
        data: createdUser,
      };
    }
  }
}
