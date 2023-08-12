import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../../auth/types/jwt';

/**
 * Decorator for controllers to get user instance
 * returns user from the JwtPayload
 *
 * @example
 *
 *  '@'Get('/user')
 *  '@'UseGuards(AuthGuard('jwt'))
 *   async test(@User() payload: JwtPayload) {
 *    // do whatever you want with the user here
 *   }
 *
 */

export const User = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.user as JwtPayload;
	},
);
