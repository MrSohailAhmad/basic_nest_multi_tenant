import { Body, Controller, Param, Post, Query, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './tenantUser.service';
import { LoginDto, RegisterUserDto } from './dto/auth.dto';
import { YupValidationPipe } from 'src/common/pipes/yup-validation.pipe';
import { loginSchema, RegisterSchema } from './validations/auth.validations';

@ApiTags('Tenant User')
@Controller('tenant-user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':tenantId/login')
  @ApiOperation({ summary: 'login user' })
  @ApiResponse({ status: 200, description: 'User login successfully' })
  async loginUser(
    @Body(new YupValidationPipe(loginSchema)) body: LoginDto,
    @Param('tenantId') tenantId: string,
  ) {
    const response = await this.authService.login(body, tenantId);
    return response;
  }

  @Post(':tenantId/register')
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, description: 'User Register successfully' })
  async registerUser(
    @Body(new YupValidationPipe(RegisterSchema)) body: RegisterUserDto,
    @Param('tenantId') tenantId: string,
  ) {
    const response = await this.authService.registerUser(body, tenantId);
    return response;
  }
}
