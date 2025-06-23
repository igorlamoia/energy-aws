import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { executeWithTiming } from 'src/core/helpers';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ReadingDocument } from 'src/infra/mongo/models/reading.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ReadingService {
  constructor(
    private prisma: PrismaService,
    @InjectModel('Reading') private readingModel: Model<ReadingDocument>,
  ) {}

  async create(data: Prisma.ReadingUncheckedCreateInput, dbType: 'sql' | 'nosql') {
    if (dbType === 'sql')
      return executeWithTiming(() => this.prisma.reading.create({ data }));
    const reading = new this.readingModel(data);
    return executeWithTiming(() => reading.save());
  }

  async findAll(query: Record<string, any>, dbType: 'sql' | 'nosql' = 'nosql'): Promise<any> {
    if(dbType === 'nosql') {
      console.log('in nosql');
      return executeWithTiming(() => this.readingModel.find());
    }
    const {data, ...rest} = await executeWithTiming(() => this.prisma.reading.findMany({
      where: this.buildWhereClause(query),
      orderBy: { id: query.order_by },
    }));

    const consume = data.reduce(
      (acc, reading) => acc + reading.energy_consumed,
      0,
    );

    return {
      ...rest,
      consume,
      data,
    };
  }

  async findOne(id: number) {
    return executeWithTiming(() => this.prisma.reading.findUnique({ where: { id } }));
  }

  async delete(id: number) {
    return await executeWithTiming(() =>
      this.prisma.reading.delete({ where: { id } })
    )
  }

  async findByHardware(id_hardware: number, query: Record<string, any>) {
    const { data, ...rest } = await executeWithTiming(() =>
      this.prisma.reading.findMany({
        where: {
          id_hardware,
          ...this.buildWhereClause(query),
        },
        orderBy: { id: query.order_by },
      }),
    );
    const consume = data.reduce(
      (acc, reading) => acc + reading.energy_consumed,
      0,
    );

    return {
      ...rest,
      consume,
      data,
    };
  }

  async findByUtilityCompany(id_utility_company: number, query: Record<string, any>) {
    const { data, ...rest } = await executeWithTiming(() =>
      this.prisma.reading.findMany({
        where: {
          Hardware: {
            Residence: {
              id_utility_company,
            }
          },
          ...this.buildWhereClause(query),
        },
        orderBy: { id: query.order_by },
      }),
    );

    const consume = data.reduce(
      (acc, reading) => acc + reading.energy_consumed,
      0,
    );

    return {
      ...rest,
      consume,
      data,
    };
  }

  async update(id: number, data: Prisma.ReadingUncheckedCreateInput) {
    return  executeWithTiming(() =>
      this.prisma.reading.update({
        where: { id },
        data,
      })
    )
  }

  private buildWhereClause(query: Record<string, any>) {
    const where: Prisma.ReadingWhereInput = {};
    where.energy_consumed = {};
    where.start_time = {};
    where.end_time = {};
    if (query.min_energy) where.energy_consumed.gte = Number(query.min_energy);
    if (query.max_energy) where.energy_consumed.lte = Number(query.max_energy);
    if (query.start_time) where.start_time.gte = new Date(query.start_time);
    if (query.end_time) where.end_time.lte = new Date(query.end_time);

    return where;
  }
}
