import { BaseResponseDto } from "@application/dtos/base/requests";

export type GetProjectDto = BaseResponseDto & {
    name: string;
    description: string;
}