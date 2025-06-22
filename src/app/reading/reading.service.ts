import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { executeWithTiming } from 'src/core/helpers';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class ReadingService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ReadingUncheckedCreateInput) {
    return this.prisma.reading.create({ data });
  }

  async findAll(query: Record<string, any>) {
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
    return this.prisma.reading.findUnique({ where: { id } });
  }

  async delete(id: number) {
    return this.prisma.reading.delete({ where: { id } });
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
