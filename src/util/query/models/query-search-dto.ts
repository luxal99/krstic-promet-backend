export interface QuerySearchDto {
  path: string;
  operation: ">" | "<" | "=";
  value: string;
  key?: string;
}
