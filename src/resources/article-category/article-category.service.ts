import {Injectable} from "@nestjs/common";
import {GenericService} from "../../util/generic/generic.service";
import {ArticleCategory} from "../../entities/ArticleCategory";
import {ArticleCategoryRepository} from "../../repository/ArticleCategoryRepository";

@Injectable()
export class ArticleCategoryService extends GenericService<ArticleCategory> {

    constructor(private repository: ArticleCategoryRepository) {
        super(repository, []);
    }
}
