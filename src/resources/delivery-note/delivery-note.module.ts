import { Module } from "@nestjs/common";
import { DeliveryNoteService } from "./delivery-note.service";
import { DeliveryNoteController } from "./delivery-note.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeliveryNoteRepository } from "../../repository/DeliveryNoteRepository";
import { ArticleRepository } from "../../repository/ArticleRepository";
import { ArticleService } from "../article/article.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository, DeliveryNoteRepository]),
  ],
  controllers: [DeliveryNoteController],
  providers: [ArticleService, DeliveryNoteService],
})
export class DeliveryNoteModule {}
