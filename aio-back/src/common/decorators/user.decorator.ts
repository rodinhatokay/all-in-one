import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator for controllers to get user instance
 * returns user from the db!
 *
 * @example
 *
 *  '@'Get('/user')
 *  '@'UseGuards(AuthGuard('jwt'))
 *   async test(@User() payload: User) {
 *    // do whatever you want with the user here
 *   }
 *
 */

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
