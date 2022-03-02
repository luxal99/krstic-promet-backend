import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { Article } from "../../entities/Article";
import { ArticleRepository } from "../../repository/ArticleRepository";
import { ILike, Like } from "typeorm";

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

  async searchForArticle(searchText: string): Promise<Article[]> {
    return await this.repository
      .createQueryBuilder("deliveryNote")
      .leftJoinAndSelect(
        "deliveryNote.idArticleSubCategory",
        "idArticleSubCategory"
      )
      .leftJoinAndSelect("deliveryNote.idWarehouse", "idWarehouse")
      .leftJoinAndSelect("deliveryNote.idConversion", "idConversion")
      .where("LOWER(deliveryNote.code) like :code", { code: `%${searchText}%` })
      .orWhere("LOWER(deliveryNote.name) like :name", {
        name: `%${searchText}%`,
      })
      .getMany();
  }
}
