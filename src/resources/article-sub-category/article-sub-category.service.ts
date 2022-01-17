import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { ArticleSubCategory } from "../../entities/ArticleSubCategory";
import { ArticleSubCategoryRepository } from "../../repository/ArticleSubCategoryRepository";

@Injectable()
export class ArticleSubCategoryService extends GenericService<ArticleSubCategory> {
  constructor(private repository: ArticleSubCategoryRepository) {
    super(repository, ["idArticleCategory"]);
  }
}
