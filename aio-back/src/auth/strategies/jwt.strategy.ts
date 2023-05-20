import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/user.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: (req: Request) => {
        // create two auth methods one via bearer token
        // the other one cookie based
        // NOTE: we are using cookie for web browesr(next.js app )
        //       and for bearer auth token for SDK's and none browser apps
        let token = null;
        if (req?.headers) {
          token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
          // if (!token) {
          //   token = req.session?.jwt?.access_token;
          // }
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: { email: string; id: string }) {
    const user = await this.usersService.findOne(payload.id);
    const userWithoutPassword = { ...user, password: undefined };
    return userWithoutPassword;
  }
}