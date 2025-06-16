import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  async findByHardware(id_hardware: number) {
    return this.prisma.reading.findMany({
      where: { id_hardware },
      orderBy: { start_time: 'desc' },
    });
  }
}
