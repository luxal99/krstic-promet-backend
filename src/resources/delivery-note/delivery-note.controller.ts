import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { DeliveryNoteService } from "./delivery-note.service";
import { Response } from "express";
import { DeliveryNote } from "../../entities/DeliveryNote";

@Controller("delivery-note")
export class DeliveryNoteController {
  constructor(private readonly deliveryNoteService: DeliveryNoteService) {}

  @Post()
  async save(@Body() body: DeliveryNote, @Res() res: Response) {
    try {
      // @ts-ignore
      body.listOfArticles = body.listOfArticles.map((item) => ({
        idArticle: { id: item.id },
        sellingPrice: item.sellingPrice,
      }));
      res.send(await this.deliveryNoteService.save(body));
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Get()
  async getAll(@Res() res: Response) {
    try {
      res.send(await this.deliveryNoteService.findAll());
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }
}
