import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './tenant.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { LoginDto } from '../tenantUser/dto/auth.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { YupValidationPipe } from 'src/common/pipes/yup-validation.pipe';
import {
  createUserSchema,
  loginTenantSchema,
  updateUserSchema,
} from './validations/tenant.validation';

@ApiTags('Tenant')
@Controller('tenant')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  register(
    @Body(new YupValidationPipe(createUserSchema)) createUserDto: CreateUserDto,
  ) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 201, description: 'User Login successfully' })
  login(
    @Body(new YupValidationPipe(loginTenantSchema)) createUserDto: LoginDto,
  ) {
    return this.userService.login(createUserDto);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles('Owner')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles('Owner')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update user by ID' })
  update(
    @Param('id') id: string,
    @Body(new YupValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('Owner')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete user by ID' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
