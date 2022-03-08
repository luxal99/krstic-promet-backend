import { Controller, Delete, HttpStatus, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { DeliveryNoteArticleService } from "./delivery-note-article.service";
import { ArticleService } from "../article/article.service";
import { DeliveryNoteArticle } from "../../entities/DeliveryNoteArticle";

@Controller("delivery-note-article")
export class DeliveryNoteArticleController {
  constructor(
    private deliveryNoteArticleService: DeliveryNoteArticleService,
    private articleService: ArticleService
  ) {}

  @Delete("/:id")
  async deleteNoteArticle(@Param("id") id: number, @Res() res: Response) {
    try {
      const deliveryNoteArticleById: DeliveryNoteArticle =
        await this.deliveryNoteArticleService.findOne(id);
      await this.deliveryNoteArticleService.delete(id).then(async () => {
        deliveryNoteArticleById.idArticle.amount +=
          deliveryNoteArticleById.deliveredAmount;
        await this.articleService
          .update(
            deliveryNoteArticleById.idArticle.id,
            deliveryNoteArticleById.idArticle
          )
          .then(async (resp) => {
            resp.debit = resp.amount * resp.purchasePrice;
            await this.articleService.update(resp.id, resp);
          });
        res.send({ status: HttpStatus.OK });
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }
}
