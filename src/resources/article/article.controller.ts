import { Controller, Get, HttpStatus, Put, Req, Res } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { GenericController } from "../../util/generic/generic.controller";
import { Article } from "../../entities/Article";
import { Request, Response } from "express";
import { Pagination, Search } from "../../annotations/annotations";
@Controller("article")
export class ArticleController extends GenericController<Article> {
  constructor(private readonly articleService: ArticleService) {
    super(articleService);
  }

  @Put()
  async put(@Req() req: Request, @Res() res: Response) {
    try {
      req.body.debit = req.body.amount * req.body.sellingPrice;
      await this.articleService.update(req.body.id, req.body).then((resp) => {
        res.status(HttpStatus.OK).send(resp);
      });
    } catch (e) {
      res.sendStatus(HttpStatus.BAD_GATEWAY);
    }
  }

  @Get()
  async getAll(
    @Req() req: Request,
    @Res() res: Response,
    @Pagination() pagination
  ) {
    try {
      const articleQueryResults: [Article[], number] =
        await this.articleService.getArticlesWithPagination(pagination);
      res.header("TOTAL", JSON.stringify(articleQueryResults[1]));
      res.send(articleQueryResults[0]);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }

  @Get("search")
  async searchArticles(
    @Res() res: Response,
    @Req() req: Request,
    @Search() search: string
  ) {
    try {
      res.send(await this.articleService.searchForArticle(search));
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }
}
