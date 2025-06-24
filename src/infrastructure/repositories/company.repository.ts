import { ICompanyRepository } from "@application/repositories";
import { DatabaseService } from "@infrastructure/database/database.service";
import { Injectable } from "@nestjs/common";
import { Company } from "@prisma/client";

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findById(id: string): Promise<Company | null> {
    return this.databaseService.company.findUnique({
      where: { id },
    });
  }
}