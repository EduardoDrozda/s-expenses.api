import { BaseResponseDto } from "@application/dtos/base";

export type GetProjectDto = BaseResponseDto & {
    name: string;
    description: string;
}