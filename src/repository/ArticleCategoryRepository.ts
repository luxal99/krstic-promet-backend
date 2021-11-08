import {EntityRepository, Repository} from "typeorm";
import {Article} from "../entities/Article";
import {ArticleCategory} from "../entities/ArticleCategory";

@EntityRepository(ArticleCategory)
export class ArticleRepository extends Repository<ArticleCategory> {

}
