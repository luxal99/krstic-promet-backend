import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticleRepository} from "../../repository/ArticleRepository";

@Module({
  imports:[TypeOrmModule.forFeature([ArticleRepository])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
