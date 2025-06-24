
import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Prisma } from '@prisma/client';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from 'src/infra/mongo/schemas';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>) {}

  async findAll(db: 'sql' | 'nosql' = 'sql') {
    if(db === 'sql')
      return await this.prisma.customer.findMany();
    // For NoSQL, you would typically use a different service or model.
    // Assuming you have a NoSQL model set up, you would return that here.
    // For example:
    return await this.customerModel.find();
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
