import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async register(@Body() signUpData: SignUpUserDto) {
    return await this.authService.signUp(signUpData);
  }

  @HttpCode(200)
  @Post('signin')
  async login(@Body() signInData: SignInUserDto) {
    return await this.authService.signIn(signInData);
  }

  @HttpCode(200)
  @Post('rt')
  async refreshToken(@Body() refreshToken: { refreshToken: string }) {
    return await this.authService.refreshToken(refreshToken.refreshToken);
  }
}
