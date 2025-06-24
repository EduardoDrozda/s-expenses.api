import { Injectable } from "@nestjs/common";
import { IBaseUseCase } from "../IBase.use-case";
import { CreateExpenseRequestDto } from "@application/dtos/expense/request";

@Injectable()
export class CreateExpenseUseCase implements IBaseUseCase<CreateExpenseRequestDto, void> {

  async execute(data: CreateExpenseRequestDto): Promise<void> {
    console.log("Creating expense with data:", data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}