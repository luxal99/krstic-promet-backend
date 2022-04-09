import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { Article } from "../../entities/Article";
import { ArticleRepository } from "../../repository/ArticleRepository";
import { PaginationDto } from "../../models/dto/PaginationDto";
import { SelectQueryBuilder } from "typeorm";
import { ArticleQueryDto } from "../../models/dto/ArticleQueryDto";
import { getQueryParameters, QueryParameters } from "../../util/query/get-path";

@Injectable()
export class ArticleService extends GenericService<Article> {
  constructor(private repository: ArticleRepository) {
    super(repository, ["idArticleSubCategory", "idWarehouse", "idConversion"]);
  }

  async updateAmount(article: any): Promise<void> {
    const articleByID: Article = await this.findOne(article.id);
    await this.repository.update(article.id, {
      amount: article.amountInWarehouse - article.deliveredAmount,
      debit:
        (article.amountInWarehouse - article.amount) *
        articleByID.purchasePrice,
    });
  }

  async updateCustomAmount(article: any, articleSize: number): Promise<any> {
    const articleByID: Article = await this.findOne(article.id);
    return await this.repository.update(article.id, {
      amount: article.amountInWarehouse - articleSize,
      debit:
        (article.amountInWarehouse - articleSize) * articleByID.purchasePrice,
    });
  }

  getArticleQueryBuilder(pagination?: PaginationDto): SelectQueryBuilder<any> {
    const query = this.genericRepository
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.idArticleSubCategory", "idArticleSubCategory")
      .leftJoinAndSelect("article.idWarehouse", "idWarehouse")
      .leftJoinAndSelect("article.idConversion", "idConversion");

    if (pagination) {
      query.take(pagination.rows).skip(pagination.rows * pagination.page);
    }
    return query;
  }

  async searchForArticle(
    queryDto: ArticleQueryDto
  ): Promise<[Article[], number]> {
    const queryBuilder: SelectQueryBuilder<any> = this.getArticleQueryBuilder(
      queryDto.pagination
    );
    if (queryDto.filters) {
      queryDto.filters.forEach((item) => {
        const queryParameters: QueryParameters = getQueryParameters(
          item,
          "article"
        );
        queryBuilder.andWhere(
          queryParameters.path,
          queryParameters.comparableObject
        );
      });
    }

    if (queryDto.searchText) {
      queryBuilder.andWhere(
        "(LOWER(article.code) like :searchText or LOWER(article.name) like :searchText)",
        { searchText: `%${queryDto.searchText}%` }
      );
    }

    return queryBuilder.getManyAndCount();
  }
}
