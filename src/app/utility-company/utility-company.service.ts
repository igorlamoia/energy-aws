import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class UtilityCompanyService {
  constructor(private prisma: PrismaService) {}

  create(dto: Prisma.UtilityCompanyUncheckedCreateInput) {
    return this.prisma.utilityCompany.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.utilityCompany.findMany();
  }

  findOne(id: number) {
    return this.prisma.utilityCompany.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, dto: Prisma.UtilityCompanyUncheckedUpdateInput) {
    return this.prisma.utilityCompany.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.utilityCompany.delete({
      where: { id },
    });
  }

  findByStateId(id_state: number) {
    return this.prisma.utilityCompany.findMany({
      where: { id_state },
    });
  }
}
