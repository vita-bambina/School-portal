import { Body, Controller, Post, Res, Get, Request } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guards';
import { RolesGuard } from '../auth/guards/roles.guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'login successful' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    //  Send login details to service
    const result = await this.authService.login(loginDto);

    // Store JWT inside cookie
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',

      maxAge: 24 * 60 * 60 * 1000,
    });

    //  Send response back to frontend
    return {
      message: result.message,
      user: result.user,
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'logout' })
  @ApiResponse({ status: 201, description: 'Successfully Logout' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return this.authService.logout();
  }

  //  get users login names, to enable which users is logged in
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return this.authService.getMe(req.user.id);
  }
}
