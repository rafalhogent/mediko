import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, Tokens } from './models/auth.types';
import { JwtPayload } from './models/jwtPayload.type';
import { jwtConstants } from './constants';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    pass: string,
    clientId?: string,
  ): Promise<AuthResponse> {
    const user = await this.usersService.findOne(username);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const newCLientId = clientId?.length ? clientId : this.generateClientId();
    const newTokens = await this.generateTokens(user.id, username, newCLientId);

    return { ...newTokens, user: user.name };
  }

  async register(username: string, pass: string): Promise<AuthResponse> {
    if (!username?.length || !pass?.length)
      throw new BadRequestException('Invalid credentials');

    const user = await this.usersService.findOne(username);
    if (user)
      throw new BadRequestException('User with same name already exists');

    const hash = await bcrypt.hash(pass, 10);
    const res = await this.usersService.create(username, hash);

    const clientId = this.generateClientId();
    const tokens = await this.generateTokens(res.id, res.name, clientId);

    return { ...tokens, user: username };
  }

  //#region private methods

  private async generateTokens(
    userId: number,
    username: string,
    clientId: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      username: username,
      clientId: clientId,
    };

    const at = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: jwtConstants.accessTokenExp,
    });

    return {
      access_token: at,
    };
  }

  private generateClientId() {
    return uuidv4();
  }
  //#endregion
}
