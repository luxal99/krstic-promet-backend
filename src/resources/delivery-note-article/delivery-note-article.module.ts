import { Module } from "@nestjs/common";
import { DeliveryNoteArticleService } from "./delivery-note-article.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeliveryNoteArticleRepository } from "../../repository/DeliveryNoteArticleRepository";
import { DeliveryNoteArticleController } from "./delivery-note-article.controller";
import { ArticleService } from "../article/article.service";
import { ArticleRepository } from "../../repository/ArticleRepository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DeliveryNoteArticleRepository,
      ArticleRepository,
    ]),
  ],
  providers: [DeliveryNoteArticleService, ArticleService],
  controllers: [DeliveryNoteArticleController],
})
export class DeliveryNoteArticleModule {}
