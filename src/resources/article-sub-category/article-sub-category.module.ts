import { Module } from '@nestjs/common';
import { ArticleSubCategoryService } from './article-sub-category.service';
import { ArticleSubCategoryController } from './article-sub-category.controller';

@Module({
  controllers: [ArticleSubCategoryController],
  providers: [ArticleSubCategoryService]
})
export class ArticleSubCategoryModule {}
