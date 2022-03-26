import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const DeliveryNoteQuery = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    try {
      return JSON.parse(decodeURI(ctx.switchToHttp().getRequest().query.q));
    } catch (e) {
      return null;
    }
  }
);
export const Pagination = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    try {
      return JSON.parse(decodeURI(ctx.switchToHttp().getRequest().query.q))
        .pagination;
    } catch (e) {
      return null;
    }
  }
);
