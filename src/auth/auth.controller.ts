import {
  Controller,
  Param,
  Get,
  Req,
  Res,
  Request,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Express, Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponse } from './entities/sign-in.entity';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOkResponse({ type: SignInResponse })
  @Roles('public')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('me')
  me(@Request() req: any) {
    return {
      sub: req.user.sub,
      email: req.user.email,
      username: req.user.username,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Signup' })
  @Roles('public')
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() createUserDto: SignUpDto) {
    return this.authService.signUp(createUserDto);
  }

  // Before it you have to create a folder name upload on root directory so it will upload file on that. API endpoint : auth/upload method: post
  @Roles('public')
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      file: file,
    };
  }

  // To access image from here you need to send token in header
  @Roles('admin', 'user')
  @Get('upload/:fileName')
  accessFile(
    @Param('fileName') fileName: string,
    @Req() req: any,
    @Res() res: Response,
  ) {
    console.log("here", req.cookies.token);
    
    res.sendFile(fileName, {
      root: './public/uploads',
    });
  }

  @Roles('public')
  @Get('set-cookie')
  setCooke(@Res() res: Response) {
    res.cookie('token', 'my token', { maxAge: 10000 }).json({
      user: {
        id: 1,
        name: 'chandu',
      },
      message: 'message!',
      status: 200,
    });
  }
}
