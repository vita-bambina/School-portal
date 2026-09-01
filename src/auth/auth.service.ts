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
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Compare the password entered with the hashed password in database
    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log('PASSWORD MATCH:', passwordMatch);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    //  Create information that will go inside JWT
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
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

  // logout function
  logout() {
    return {
      message: 'Logged out Successfully',
    };
  }
  async getMe(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        role: true,
      },
    });
  }
}
