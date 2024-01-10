import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from '../common/decorators/roles.decorator';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SignInResponse } from './entities/sign-in.entity';

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
}
