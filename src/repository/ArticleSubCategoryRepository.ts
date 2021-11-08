import {EntityRepository, Repository} from "typeorm";
import {ArticleCategory} from "../entities/ArticleCategory";
import {ArticleSubCategory} from "../entities/ArticleSubCategory";

@EntityRepository(ArticleSubCategory)
export class ArticleSubCategoryRepository extends Repository<ArticleSubCategory> {

}
