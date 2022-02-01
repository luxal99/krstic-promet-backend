import { PaginationDto } from "./PaginationDto";

export interface DeliveryNoteQueryDto {
  startDate: string;
  endDate: string;
  pagination: PaginationDto;
}
