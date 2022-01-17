import { Article } from "../entities/Article";
import { ArticleCategory } from "../entities/ArticleCategory";
import { ArticleSubCategory } from "../entities/ArticleSubCategory";
import { Conversion } from "../entities/Conversion";
import { User } from "../entities/User";
import { Warehouse } from "../entities/Warehouse";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DeliveryNote } from "../entities/DeliveryNote";
import { Client } from "../entities/Client";
import { DeliveryNoteArticle } from "../entities/DeliveryNoteArticle";

const LIST_OF_ENTITIES = [
  Article,
  ArticleCategory,
  ArticleSubCategory,
  DeliveryNote,
  DeliveryNoteArticle,
  Conversion,
  Client,
  User,
  Warehouse,
];

export const CONFIG = ConfigModule.forRoot({
  isGlobal: true,
});
export const DATABASE_CONFIG = TypeOrmModule.forRoot({
  type: "mysql",
  host: "localhost",
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: LIST_OF_ENTITIES,
  synchronize: true,
});
export const AUTHORIZATION_HEADER = "Authorization";

export class Message {
  static ACCESS_DENIED_MESSAGE = "Pristup odbijen";
  static INVALID_TOKEN_MESSAGE = "Nevalidan token";
}
