import { Controller } from '@nestjs/common';
import { ArticleSubCategoryService } from './article-sub-category.service';

@Controller('article-sub-category')
export class ArticleSubCategoryController {
  constructor(private readonly articleSubCategoryService: ArticleSubCategoryService) {}
}
