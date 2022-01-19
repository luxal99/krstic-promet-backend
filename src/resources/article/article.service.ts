import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { Article } from "../../entities/Article";
import { ArticleRepository } from "../../repository/ArticleRepository";
import { DeliveryNoteArticleDto } from "../../models/dto/DeliveryNoteArticleDto";

@Injectable()
export class ArticleService extends GenericService<Article> {
  constructor(private repository: ArticleRepository) {
    super(repository, ["idArticleSubCategory", "idWarehouse", "idConversion"]);
  }

  async updateAmount(article: any): Promise<void> {
    await this.repository.update(article.id, {
      amount: article.amountInWarehouse - article.amount,
    });
  }
}
