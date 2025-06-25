import { BaseRequestDTO } from "@application/dtos/base/requests";
import { IsNotEmpty } from "class-validator";

export class CreateUserRequestDTO extends BaseRequestDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  phone: string;
}