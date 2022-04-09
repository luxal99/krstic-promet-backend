import { PaginationDto } from "./PaginationDto";
import { QuerySearchDto } from "../../util/query/models/query-search-dto";

export interface ArticleQueryDto {
  searchText?: string;
  pagination: PaginationDto;
  filters: QuerySearchDto[];
}
