import { BaseResponseDto } from "@application/dtos/base";

export type GetUserResponseDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  is_active?: boolean;
  company?: {
    id: string;
    name: string;
  }
  role: string;
} & BaseResponseDto;