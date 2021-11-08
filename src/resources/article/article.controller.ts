import {Controller} from "@nestjs/common";
import {ArticleService} from "./article.service";
import {GenericController} from "../../util/generic/generic.controller";
import {Article} from "../../entities/Article";

@Controller("article")
export class ArticleController extends GenericController<Article> {
    constructor(private readonly articleService: ArticleService) {
        super(articleService);
    }
}
