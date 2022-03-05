import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { DeliveryNoteService } from "./delivery-note.service";
import { Request, Response } from "express";
import { DeliveryNote } from "../../entities/DeliveryNote";
import { ArticleService } from "../article/article.service";
import { DeliveryNoteQuery } from "../../annotations/annotations";
import { DeliveryNoteQueryDto } from "../../models/dto/DeliveryNoteQueryDto";
import { Article } from "../../entities/Article";
import { DeliveryNoteArticle } from "../../entities/DeliveryNoteArticle";

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
        amount: item.amount,
        deliveryStatus: item.deliveryStatus,
        deliveredAmount: item.deliveredAmount,
        payedAmount: item.payedAmount,
        paidStatus: item.paidStatus,
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

  @Put()
  async update(
    @Res() response: Response,
    @Req() req: Request,
    @Body() body: DeliveryNote
  ) {
    const deliveryNoteById: DeliveryNote =
      await this.deliveryNoteService.findById(body.id);
    const listOfArticles = body.listOfArticles;
    // @ts-ignore
    body.listOfArticles = body.listOfArticles.map((item) => ({
      //@ts-ignore
      id: item.idDeliveryNoteArticle ? item.idDeliveryNoteArticle : null,
      idArticle: { id: item.id },
      sellingPrice: item.sellingPrice,
      amount: item.amount,
      deliveryStatus: item.deliveryStatus,
      deliveredAmount: item.deliveredAmount,
      payedAmount: item.payedAmount,
      paidStatus: item.paidStatus,
    }));
    let amountSizeToUpdate = 0;
    for (const article of listOfArticles) {
      const articleById: DeliveryNoteArticle =
        deliveryNoteById.listOfArticles.find(
          (item) => item.idArticle.id === article.id
        );
      amountSizeToUpdate =
        (articleById ? articleById.amount : 0) - article.amount;
      await this.articleService.updateCustomAmount(article, amountSizeToUpdate);
    }

    response.send(await this.deliveryNoteService.update(body.id, body));
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

  @Get()
  async findByiId(@Param("id") id: number, @Res() res: Response) {}

  @Delete("/:id")
  async deleteDeliveryNote(@Param("id") id: number, @Res() res: Response) {
    try {
      const deliveryNotesById: DeliveryNote =
        await this.deliveryNoteService.findById(id);
      this.deliveryNoteService.delete(id).then(async () => {
        for (let articleDto of deliveryNotesById.listOfArticles) {
          articleDto.idArticle.amount =
            articleDto.idArticle.amount + articleDto.amount;
          await this.articleService.update(
            articleDto.idArticle.id,
            articleDto.idArticle
          );
        }

        res.sendStatus(HttpStatus.OK);
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Get("find-by-paid-status")
  async findDeliveryNoteByPaidStatus(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query
  ) {
    try {
      res.send(
        await this.deliveryNoteService.findDeliveryNoteByPaidStatus(
          query.paidStatus
        )
      );
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Get("find-by-delivery-status")
  async findDeliveryNoteByDeliveryStatus(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query
  ) {
    try {
      res.send(
        await this.deliveryNoteService.findDeliveryNoteByDeliveryStatus(
          query.deliveryStatus
        )
      );
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }
}
