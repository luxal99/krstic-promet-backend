import { Controller, Get, HttpStatus, Query, Req, Res } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { GenericController } from "../../util/generic/generic.controller";
import { Article } from "../../entities/Article";
import { Request, Response } from "express";

@Controller("article")
export class ArticleController extends GenericController<Article> {
  constructor(private readonly articleService: ArticleService) {
    super(articleService);
  }

  @Get("search")
  async searchByCode(
    @Res() res: Response,
    @Req() req: Request,
    @Query() query
  ) {
    try {
      res.send(
        await this.articleService.searchForArticle(decodeURI(query.search))
      );
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ err });
    }
  }
}
