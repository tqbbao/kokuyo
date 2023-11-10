import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PermisstionUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(data);
    const userId = data ? request.user && request.user[data] : request.user;

    // console.log(request.params.id)
    // console.log(userId);

    if (userId !== request.params.id) {
      return false;
    }
    return true;
  },
);
