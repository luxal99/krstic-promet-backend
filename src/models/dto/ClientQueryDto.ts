import { PaginationDto } from "./PaginationDto";

export interface ClientQueryDto {
  search?: string;
  pagination: PaginationDto;
}
