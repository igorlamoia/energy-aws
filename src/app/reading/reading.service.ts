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

  async findAll() {
    return this.prisma.reading.findMany();
  }

  async findOne(id: number) {
    return this.prisma.reading.findUnique({ where: { id } });
  }

  async delete(id: number) {
    return this.prisma.reading.delete({ where: { id } });
  }

  async findByHardware(id_hardware: number, query: Record<string, any>){
    const { min_energy, max_energy, start_time, end_time, order_by } = query;

    const {data, ...rest} = await executeWithTiming(() =>
      this.prisma.reading.findMany({
        where: {
          id_hardware,
          energy_consumed: {
            gte: min_energy ? Number(min_energy) : undefined,
            lte: max_energy ? Number(max_energy) : undefined,
          },
          start_time: {
            gte: start_time ? new Date(start_time) : undefined,
          },
          end_time: {
            lte: end_time ? new Date(end_time) : undefined,
          },
        },
        orderBy: { id: order_by }
      })
    );
    const consume = data.reduce((acc, reading) => acc + reading.energy_consumed, 0);

    return {
      ...rest,
      consume,
      data,
    }
  }
}
