import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class loginTenantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
