import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { Article } from "../../entities/Article";
import { ArticleRepository } from "../../repository/ArticleRepository";

@Injectable()
export class ArticleService extends GenericService<Article> {
  constructor(private repository: ArticleRepository) {
    super(repository, ["idArticleSubCategory", "idWarehouse", "idConversion"]);
  }
}
