import {
	Injectable,
	UnauthorizedException,
	ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../types/jwt';
import { RegisterDto } from '../dto/req/register.dto';

@Injectable()
export class JwtAuthToRegisterGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	handleRequest<TUser = JwtPayload>(
		err: any,
		user: JwtPayload,
		info: any,
		context: ExecutionContext,
	): TUser {
		// Access the request body
		const request = context.switchToHttp().getRequest();
		const body: RegisterDto = request.body;

		// You can now access the request body within the handleRequest method
		console.log('Request Body:', body);

		console.log('USER requesting to register in jwt:', user);

		// Rest of the authentication logic
		// users jwt must be with phone number provided security wise!
		if (!user || err || user.userId || user.phoneNumber !== body.phoneNumber) {
			throw err || new UnauthorizedException();
		}

		return user as TUser;
	}
}
