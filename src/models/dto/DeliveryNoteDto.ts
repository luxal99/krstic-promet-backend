import { DeliveryNoteArticleDto } from "./DeliveryNoteArticleDto";
import { DeliveryNoteStatusEnum } from "../../enum/DeliveryNoteStatusEnum";
import { DeliveryNotePaidStatusEnum } from "../../enum/DeliveryNotePaidStatusEnum";

export interface DeliveryNoteDto {
  id: number;
  dateOfDeliveryNote: string;
  paidStatus: DeliveryNotePaidStatusEnum;
  deliveryStatus: DeliveryNoteStatusEnum;
  listOfArticles: DeliveryNoteArticleDto[];
  gross: number;
}
