import {Module} from "@nestjs/common";
import {ArticleSubCategoryService} from "./article-sub-category.service";
import {ArticleSubCategoryController} from "./article-sub-category.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticleSubCategoryRepository} from "../../repository/ArticleSubCategoryRepository";

@Module({
    imports: [TypeOrmModule.forFeature([ArticleSubCategoryRepository])],
    controllers: [ArticleSubCategoryController],
    providers: [ArticleSubCategoryService]
})
export class ArticleSubCategoryModule {
}
