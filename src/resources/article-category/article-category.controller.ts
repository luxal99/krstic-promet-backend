import {Controller} from "@nestjs/common";
import {ArticleCategoryService} from "./article-category.service";
import {GenericController} from "../../util/generic/generic.controller";
import {ArticleCategory} from "../../entities/ArticleCategory";

@Controller("article-category")
export class ArticleCategoryController extends GenericController<ArticleCategory> {
    constructor(private readonly articleCategoryService: ArticleCategoryService) {
        super(articleCategoryService);
    }
}
