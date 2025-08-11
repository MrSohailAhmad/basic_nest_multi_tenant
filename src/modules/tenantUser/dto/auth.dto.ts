import { ApiProperty, PartialType } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterUserDto {
  @ApiProperty()
  name: String;

  @ApiProperty()
  email: String;

  @ApiProperty()
  password: String;
}
