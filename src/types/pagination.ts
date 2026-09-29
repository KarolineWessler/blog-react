export interface PaginationParams {
  limit?: number;
  skip?: number;
}

export interface PaginatedResponse<T> {
  total: number;
  skip: number;
  limit: number;
  data?: T[];
}
