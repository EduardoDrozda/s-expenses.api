import { CreateExpenseRequestDto } from '@application/dtos/expense/request';
import { RolesEnum } from '@domain/enums';
import { Roles } from '@infrastructure/decorators/role';
import { FileRequiredPipe, FileSizeValidationPipe } from '@infrastructure/pipes';
import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('expenses')
export class ExpenseController {

  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  async create(
    @UploadedFiles(
      new FileRequiredPipe(),
      new FileSizeValidationPipe()
    ) files: Express.Multer.File[],
    @Body() data: CreateExpenseRequestDto
  ) {
  }
}
