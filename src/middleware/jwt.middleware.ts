import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AUTHORIZATION_HEADER, Message } from "../constant/constant";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header(AUTHORIZATION_HEADER);

    if (!token)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: Message.ACCESS_DENIED_MESSAGE });

    try {
      jwt.verify(token, process.env.TOKEN_SECRET);
      next();
    } catch (e) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: Message.INVALID_TOKEN_MESSAGE });
    }
  }
}
