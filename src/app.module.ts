import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CONFIG, DATABASE_CONFIG } from "./constant/constant";
import { UserModule } from "./resources/user/user.module";
import { ArticleModule } from "./resources/article/article.module";
import { ArticleSubCategoryModule } from "./resources/article-sub-category/article-sub-category.module";
import { ArticleCategoryModule } from "./resources/article-category/article-category.module";
import { ConversionModule } from "./resources/conversion/conversion.module";
import { WarehouseModule } from "./resources/warehouse/warehouse.module";
import { JwtMiddleware } from "./middleware/jwt.middleware";
import { ClientModule } from "./resources/client/client.module";
import { DeliveryNoteModule } from "./resources/delivery-note/delivery-note.module";
import { DeliveryNoteArticleModule } from "./resources/delivery-note-article/delivery-note-article.module";

@Module({
  imports: [
    CONFIG,
    DATABASE_CONFIG,
    ArticleModule,
    ArticleSubCategoryModule,
    ArticleCategoryModule,
    ConversionModule,
    ClientModule,
    DeliveryNoteModule,
    DeliveryNoteArticleModule,
    WarehouseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: "user/auth", method: RequestMethod.POST },
        { path: "user", method: RequestMethod.POST }
      )
      .forRoutes(
        { method: RequestMethod.POST, path: "*" },
        { method: RequestMethod.DELETE, path: "*" },
        { path: "*", method: RequestMethod.PUT },
        { path: "*", method: RequestMethod.GET }
      );
  }
}
