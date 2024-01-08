import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({
    example: 'Loged in successfully!!',
  })
  message: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  access_token: string;
}
