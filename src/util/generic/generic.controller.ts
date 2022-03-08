import { GenericService } from "./generic.service";
import {
  Body,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { Response, Request } from "express";

export class GenericController<T> {
  constructor(private readonly genericService: GenericService<T>) {}

  @Post()
  async post(@Body() entity: T, @Res() res: Response) {
    try {
      const entityResponse = await this.genericService.save(entity);
      res.send(entityResponse);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Put()
  async put(@Req() req: Request, @Res() res: Response) {
    try {
      await this.genericService.update(req.body.id, req.body).then((resp) => {
        res.status(HttpStatus.OK).send(resp);
      });
    } catch (e) {
      res.sendStatus(HttpStatus.BAD_GATEWAY);
    }
  }

  @Get()
  async get(@Res() res: Response, @Req() req: Request) {
    try {
      this.genericService.findAll().then((resp) => {
        res.send(resp);
      });
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send({ err });
    }
  }

  @Get("/:id")
  async getById(@Res() res: Response, @Param("id") id: number) {
    try {
      res.send(await this.genericService.findOne(id));
    } catch (error) {
      res.sendStatus(HttpStatus.BAD_GATEWAY);
    }
  }

  @Delete("/:id")
  async delete(@Param("id") id: number, @Res() res: Response) {
    try {
      await this.genericService.delete(id).then(() => {
        res.sendStatus(HttpStatus.OK);
      });
    } catch (err) {
      res.status(HttpStatus.BAD_GATEWAY).send({ err });
    }
  }

  @Post("/deleteAll")
  async deleteAll(@Req() req: Request, @Res() res: Response) {
    try {
      await this.genericService.delete(req.body.ids).then(() => {
        res.sendStatus(HttpStatus.OK);
      });
    } catch (e) {
      res.sendStatus(HttpStatus.BAD_GATEWAY);
    }
  }
}
