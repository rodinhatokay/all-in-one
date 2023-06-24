import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UserService } from "../../users/user.service";
import { Request } from "express";
import { JwtPayload } from "../types/jwt";

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

	/**
	 *
	 * @param payload payload is jwt decrypted into object :-> payload: JwtPayload
	 * @returns
	 */
	async validate(payload: JwtPayload) {
		// ! DONT CHANGE THIS IT IS USED FOR JWT-AUTH.guard.ts -> handleRequest
		return payload;
	}
}
