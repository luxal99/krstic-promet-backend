import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import { GenericController } from "../../util/generic/generic.controller";
import { ChangePasswordDto } from "../../models/ChangePasswordDto";
import { Request, Response } from "express";
import { AUTHORIZATION_HEADER } from "../../constant/constant";

@Controller("user")
export class UserController extends GenericController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  async registerUser(@Body() user: User, @Res() res: Response) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      res.send(await this.userService.save(user));
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Post("auth")
  private auth(@Body() user: User, @Res() resp: Response): void {
    try {
      this.userService.findByUsername(user.username).then(async (userByID) => {
        if (!userByID) {
          resp
            .status(HttpStatus.NOT_FOUND)
            .send({ message: "Korisnik nije pronađen" });
        } else {
          const isPasswordValid = await bcrypt.compare(
            user.password,
            userByID.password
          );
          if (isPasswordValid) {
            const token = jwt.sign(
              { username: userByID.username },
              process.env.TOKEN_SECRET,
              { expiresIn: 60 * 60 * 12 }
            );
            resp.setHeader(AUTHORIZATION_HEADER, token);
            resp.send({ message: "Welcome" });
          } else {
            resp
              .status(HttpStatus.FORBIDDEN)
              .send({ message: "Šifra nije validna" });
          }
        }
      });
    } catch (err) {
      resp.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Put("change-password")
  async changePassword(@Req() req: Request, @Res() res: Response) {
    try {
      const username = await jwt.verify(
        req.headers.authorization,
        process.env.TOKEN_SECRET
      ).username;
      const userByName = await this.userService.findByUsername(username);
      const body: ChangePasswordDto = req.body;
      const isPasswordMatching = await bcrypt.compare(
        body.oldPassword,
        userByName.password
      );
      if (isPasswordMatching && body.password === body.passwordConfirm) {
        userByName.password = await bcrypt.hash(body.password, 10);
        await this.userService.update(userByName.id, userByName);
        res.sendStatus(HttpStatus.OK);
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: "Šifre se ne poklapaju" });
      }
    } catch (err) {
      res.send({ err });
    }
  }
}
