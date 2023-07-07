import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { JwtPayload } from "../types/jwt";

/**
 * used for none registered user with option but have jwt token with phone number
 */
@Injectable()
export class JwtAuthToRegisterGuard extends AuthGuard("jwt") {
	constructor(private reflector: Reflector) {
		super();
	}
	handleRequest<TUser = JwtPayload>(err: any, user: JwtPayload): TUser {
		// if payload with user id then its already registered
		console.log("user", user);
		if (!user || err || user.userId) {
			throw err || new UnauthorizedException();
		}

		return user as TUser;
	}
}
