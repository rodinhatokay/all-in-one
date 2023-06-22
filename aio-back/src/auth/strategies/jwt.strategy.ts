import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../../users/user.service";
import { Request } from "express";
import { User } from "../dto/jwt.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UserService) {
		super({
			jwtFromRequest: (req: Request) => {
				let token = null;
				if (req?.headers) {
					token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
				}
				return token;
			},
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_KEY,
		});
	}

	async validate(payload: User) {
		const { id, isFullyRegistered } = payload;
		if (!id || !isFullyRegistered) {
			throw new UnauthorizedException(); // Throw the exception if user is not found
		}
		return true;
	}
}
