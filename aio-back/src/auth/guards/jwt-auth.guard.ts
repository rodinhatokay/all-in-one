import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../../common/decorators/public.decorator";
import { JwtPayload } from "../types/jwt";

/**
 * jwt auth guard check if valid token and have payload user registered
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
	constructor(private reflector: Reflector) {
		super();
	}

	canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}

		return super.canActivate(context);
	}

	handleRequest<TUser = JwtPayload>(err: any, user: JwtPayload): TUser {
		// if user doesnt have user id that means it doesnt registered so return deny access
		if (err || !user.userId) {
			throw err || new UnauthorizedException();
		}
		return user as TUser;
	}
}
