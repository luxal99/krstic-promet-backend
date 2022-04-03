import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import exp from "constants";

export const QQuery = createParamDecorator((data, ctx: ExecutionContext) => {
  try {
    return JSON.parse(decodeURI(ctx.switchToHttp().getRequest().query.q));
  } catch (e) {
    return null;
  }
});
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

export const Search = createParamDecorator((data, ctx: ExecutionContext) => {
  try {
    return ctx.switchToHttp().getRequest().query.search;
  } catch (e) {
    return null;
  }
});
