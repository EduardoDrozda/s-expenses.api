import { BaseResponseWithPaginationDto } from "@application/dtos/base";

export abstract class PaginationHelper {
  static paginate<T>(
    items: T[],
    page: number,
    limit: number
  ): BaseResponseWithPaginationDto<T> {
    const offset = (page - 1) * limit;
    const paginatedItems = items.slice(offset, offset + limit);
    const total = items.length;
    const totalPages = Math.ceil(total / limit);

    return {
      data: paginatedItems,
      total,
      page,
      limit,
      total_pages: totalPages,
      has_next_page: page < totalPages,
      has_previous_page: page > 1
    };
  }
}