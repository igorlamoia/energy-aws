import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Prisma } from '@prisma/client';
import { Model } from 'mongoose';
import { debug } from 'src/core/helpers';
import { Customer, CustomerDocument } from 'src/infra/mongo/schemas';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async findAll(db: 'sql' | 'nosql') {
    if (db === 'sql') return debug(() => this.prisma.customer.findMany());
    return debug(() => this.customerModel.find());
  }

  async findOne(id: number|string, db: 'sql' | 'nosql') {
    if (db === 'sql')
      return debug(() =>
        this.prisma.customer.findUniqueOrThrow({ where: { id: +id } }),
      );
    return debug(() => this.customerModel.findById(id).orFail());
  }

  async create(data: Prisma.CustomerUncheckedCreateInput, db: 'sql' | 'nosql') {
    if (db === 'sql') return debug(() => this.prisma.customer.create({ data }));

    const customer = new this.customerModel(data);
    return debug(() => customer.save());
  }

  async update(
    id: number,
    data: Prisma.CustomerUncheckedCreateInput,
    db: 'sql' | 'nosql',
  ) {
    if (db === 'sql')
      return debug(() => this.prisma.customer.update({ where: { id: +id }, data }));

    const customer = await this.customerModel.findById(id).orFail();
    Object.assign(customer, data);
    return debug(() => customer.save());
  }

  async delete(id: number, db: 'sql' | 'nosql') {
    if (db === 'sql')
      return debug(() => this.prisma.customer.delete({ where: { id: +id } }));
    return debug(() => this.customerModel.findByIdAndDelete(id).orFail());
  }
}
