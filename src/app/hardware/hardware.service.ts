import { Injectable } from '@nestjs/common';
import { HardwareDto } from './schemas/create-hardware.schema';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class HardwareService {
  constructor(private prisma: PrismaService) {}

  create(dto: HardwareDto) {
    return this.prisma.hardware.create({
      data: {
        firmware_version: dto.firmware_version,
        hardware_version: dto.hardware_version,
        nickname: dto.nickname,
        id_residence: dto.id_residence,
      },
    });
  }

  findAll() {
    return this.prisma.hardware.findMany();
  }

  findByResidence(id_residence: number) {
    return this.prisma.hardware.findMany({
      where: { id_residence },
      orderBy: { nickname: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.hardware.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, dto: HardwareDto) {
    return this.prisma.hardware.update({
      where: { id },
      data: {
        firmware_version: dto.firmware_version,
        hardware_version: dto.hardware_version,
        nickname: dto.nickname,
        id_residence: dto.id_residence,
      },
    });
  }

  remove(id: number) {
    return this.prisma.hardware.delete({
      where: { id },
    });
  }
}
