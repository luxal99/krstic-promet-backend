import { Injectable } from "@nestjs/common";
import { Article } from "../../entities/Article";

@Injectable()
export class AnalyticsService {
  async getMostPopularProducts(): Promise<Article[]> {
    return;
  }
}
