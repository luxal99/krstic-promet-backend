import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { DeliveryNoteArticle } from "../../entities/DeliveryNoteArticle";
import { DeliveryNoteArticleRepository } from "../../repository/DeliveryNoteArticleRepository";

@Injectable()
export class DeliveryNoteArticleService extends GenericService<DeliveryNoteArticle> {
  constructor(private repository: DeliveryNoteArticleRepository) {
    super(repository, []);
  }
}
