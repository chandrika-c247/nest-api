import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: 'Email must be an email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
