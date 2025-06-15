import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.customer.findMany();
  }

  async findOne(id: number) {
    return this.prisma.customer.findUniqueOrThrow({ where: { id } });
  }

  async create(data: Prisma.CustomerUncheckedCreateInput) {
    return await this.prisma.customer.create({ data });
  }

  async update(id: number, data: Prisma.CustomerUncheckedCreateInput) {
    return this.prisma.customer.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
