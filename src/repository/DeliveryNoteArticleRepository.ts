import { EntityRepository, Repository } from "typeorm";
import { DeliveryNoteArticle } from "../entities/DeliveryNoteArticle";

@EntityRepository(DeliveryNoteArticle)
export class DeliveryNoteArticleRepository extends Repository<DeliveryNoteArticle> {}
