import { IsPublic } from '@common/jwt';
import { Controller, Get } from '@nestjs/common';

@Controller('companies')
export class CompanyController {

  @IsPublic()
  @Get()
  findAll() {
    return [
      { id: 1, name: 'Company A' },
      { id: 2, name: 'Company B' },
      { id: 3, name: 'Company C' },
    ];
  }
}
