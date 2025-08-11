import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: String;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: String;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: String;
}
