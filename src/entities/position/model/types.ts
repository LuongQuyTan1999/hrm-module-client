export interface Position {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PositionFilters {
  search?: string;
  name?: string;
  page?: number;
  limit?: number;
}
