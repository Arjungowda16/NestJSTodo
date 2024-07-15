import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';

import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ description:'To register a new user with email.', summary: 'register a User with details.'})
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto)
  }

  @Post('login')
  @ApiOperation({ description:'Login with email.', summary: 'Endpoint to login with user email and password.'})
  login(@Body() loginData: LoginDto ){
    return this.authService.login(loginData)
  }
  
}
