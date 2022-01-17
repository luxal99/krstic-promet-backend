import { Module } from "@nestjs/common";
import { DeliveryNoteArticleService } from "./delivery-note-article.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeliveryNoteArticleRepository } from "../../repository/DeliveryNoteArticleRepository";

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryNoteArticleRepository])],
  providers: [DeliveryNoteArticleService],
})
export class DeliveryNoteArticleModule {}
