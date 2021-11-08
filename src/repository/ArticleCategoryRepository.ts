import {EntityRepository, Repository} from "typeorm";
import {ArticleCategory} from "../entities/ArticleCategory";

@EntityRepository(ArticleCategory)
export class ArticleCategoryRepository extends Repository<ArticleCategory> {

}
