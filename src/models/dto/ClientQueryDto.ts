import { PaginationDto } from "./PaginationDto";
import { DateQueryDto } from "./DateQueryDto";

export interface ClientQueryDto {
  search?: string;
  pagination: PaginationDto;
  dateQueryDto: DateQueryDto;
}
