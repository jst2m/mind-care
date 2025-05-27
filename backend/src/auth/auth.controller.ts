import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService }     from './auth.service';
import { SignupDto }       from './dto/signup.dto';
import { LoginDto }        from './dto/login.dto';
import { JwtAuthGuard }    from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  signUp(@Body() dto: SignupDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  signIn(@Body() dto: LoginDto) {
    return this.authService.signIn(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Request() req) {
    return { ok: true, user: req.user };
  }
}
