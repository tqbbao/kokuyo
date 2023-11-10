import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpUserDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/constants/jwtPayload-type';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async updateRtById(userId: number, refreshToken: string) {
    await this.userRepository.update(
      { userId: userId },
      { refreshToken: refreshToken },
    );
  }
  async updateRtByEmail(email: string, refreshToken: string) {
    await this.userRepository.update(
      { email: email },
      { refreshToken: refreshToken },
    );
  }

  async generateToken(payload: { role: UserRole; email: string; sub: number }) {
    const jwtPayload: JwtPayload = {
      email: payload.email,
      sub: payload.sub,
      role: payload.role,
    };

    const at = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: parseInt(this.configService.get('AT_TTL')),
      secret: this.configService.get<string>('AT_SECRET'),
    });

    const rt = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: parseInt(this.configService.get('RT_TTL')),
      secret: this.configService.get<string>('RT_SECRET'),
    });

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const verifyToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('RT_SECRET'),
      });
      const checkTokenExist = await this.userRepository.findOne({
        where: { refreshToken: refreshToken },
      });
      if (!checkTokenExist) {
        throw new UnauthorizedException('2Refresh token is not valid');
      }
      const payload = {
        email: verifyToken.email,
        sub: verifyToken.sub,
        role: verifyToken.role,
      };
      const { access_token, refresh_token } = await this.generateToken(payload);
      await this.updateRtByEmail(verifyToken.email, refresh_token);
      return { access_token, refresh_token };
    } catch (error) {
      throw new UnauthorizedException('1Refresh token is not valid');
    }
  }

  async signUp(signUpData: SignUpUserDto) {
    const hashedPassword = await this.hashPassword(signUpData.password);
    const user = await this.userRepository.create({
      ...signUpData,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async signIn(signInData: SignInUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: signInData.email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compareSync(
      signInData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is not valid');
    }

    const payload = { role: user.role, email: user.email, sub: user.userId };
    const { access_token, refresh_token } = await this.generateToken(payload);
    await this.updateRtById(user.userId, refresh_token);
    return { access_token, refresh_token };
  }
}
