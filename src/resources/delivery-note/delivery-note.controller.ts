import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { DeliveryNoteService } from "./delivery-note.service";
import { Response } from "express";
import { DeliveryNote } from "../../entities/DeliveryNote";
import { ArticleService } from "../article/article.service";
import { DeliveryNoteQuery } from "../../annotations/annotations";
import { DeliveryNoteQueryDto } from "../../models/dto/DeliveryNoteQueryDto";

@Controller("delivery-note")
export class DeliveryNoteController {
  constructor(
    private readonly deliveryNoteService: DeliveryNoteService,
    private articleService: ArticleService
  ) {}

  @Post()
  async save(@Body() body: DeliveryNote, @Res() res: Response) {
    try {
      const listOfArticles = body.listOfArticles;
      // @ts-ignore
      body.listOfArticles = body.listOfArticles.map((item) => ({
        idArticle: { id: item.id },
        sellingPrice: item.sellingPrice,
      }));
      const savedDeliveryNote = await this.deliveryNoteService.save(body);
      for (const article of listOfArticles) {
        await this.articleService.updateAmount(article);
      }

      res.send(savedDeliveryNote);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Get()
  async getAll(
    @Res() res: Response,
    @DeliveryNoteQuery() query: DeliveryNoteQueryDto
  ) {
    try {
      const listOfDeliveryNotes: [DeliveryNote[], number] =
        await this.deliveryNoteService.getAllWithQuery(query);
      res.header("TOTAL", JSON.stringify(listOfDeliveryNotes[1]));
      res.send(listOfDeliveryNotes[0]);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }
}
