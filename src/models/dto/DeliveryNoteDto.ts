import { DeliveryNoteStatusEnum } from "../../enum/DeliveryNoteStatusEnum";
import { DeliveryNoteArticleDto } from "./DeliveryNoteArticleDto";

export interface DeliveryNoteDto {
  id: number;
  dateOfDeliveryNote: string;
  paidStatus: DeliveryNoteStatusEnum;
  listOfArticles: DeliveryNoteArticleDto[];
  gross: number;
}
