import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'user@gmail.com',
  })
  @IsEmail({}, { message: 'Email must be an email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
