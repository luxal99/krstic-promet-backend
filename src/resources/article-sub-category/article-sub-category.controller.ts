import { Controller } from "@nestjs/common";
import { ArticleSubCategoryService } from "./article-sub-category.service";
import { GenericController } from "../../util/generic/generic.controller";
import { ArticleSubCategory } from "../../entities/ArticleSubCategory";

@Controller("article-sub-category")
export class ArticleSubCategoryController extends GenericController<ArticleSubCategory> {
  constructor(
    private readonly articleSubCategoryService: ArticleSubCategoryService
  ) {
    super(articleSubCategoryService);
  }
}
