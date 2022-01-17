import { Module } from "@nestjs/common";
import { ArticleCategoryService } from "./article-category.service";
import { ArticleCategoryController } from "./article-category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleCategoryRepository } from "../../repository/ArticleCategoryRepository";

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategoryRepository])],
  controllers: [ArticleCategoryController],
  providers: [ArticleCategoryService],
})
export class ArticleCategoryModule {}
