import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../Prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    //  Get email and password from DTO
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //  If user does not exist, stop login
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the password entered with the hashed password in database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If password is wrong, stop login
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    //  Create information that will go inside JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // 7. Create JWT token
    const token = this.jwtService.sign(payload);

    // 8. Send response back
    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        role: user.role,
      },
    };
  }
}
