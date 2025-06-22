export type BaseResponseDto = {
  id: string;
  
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_by?: string | null;
  updated_by?: string | null;
  company_id?: string;
}

export type BaseResponseWithPaginationDto<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  has_next_page?: boolean;
  has_previous_page?: boolean;
};