import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { debug } from 'src/core/helpers';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Reading, ReadingDocument } from 'src/infra/mongo/schemas';

type DbType = 'sql' | 'nosql';

@Injectable()
export class ReadingService {
  constructor(
    private prisma: PrismaService,
    @InjectModel(Reading.name)
    private readonly readingModel: Model<ReadingDocument>,
  ) {}

  async create(data: Prisma.ReadingUncheckedCreateInput, dbType: DbType) {
    if (dbType === 'sql')
      return debug(() => this.prisma.reading.create({ data }));
    const reading = new this.readingModel(data);
    return debug(() => reading.save());
  }

  async findAll(query: Record<string, any>, dbType: DbType) {
    if (dbType === 'sql') {
      const { data, ...rest } = await debug(() =>
        this.prisma.reading.findMany({
          where: this.buildPrismaWhereClause(query),
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

    const readings = await debug(() =>
      this.readingModel.find(this.buildMongoWhereClause(query)).exec(),
    );
    const consume = readings.data.reduce(
      (acc, reading) => acc + reading.energy_consumed,
      0,
    );
    return {
      consume,
      ...readings,
    };
  }

  async findOne(id: number, dbType: DbType) {
    if (dbType === 'sql')
      return debug(() =>
        this.prisma.reading.findUnique({ where: { id: +id } }),
      );

    return debug(() => this.readingModel.findById(id).exec());
  }

  async delete(id: number, dbType: DbType) {
    if (dbType === 'sql')
      return debug(() => this.prisma.reading.delete({ where: { id: +id } }));

    return debug(() => this.readingModel.findByIdAndDelete(id).exec());
  }

  async findByHardware(
    id_hardware: number|string,
    query: Record<string, any>,
    dbType: DbType,
  ) {
    if (dbType === 'sql') {
      const { data, ...rest } = await debug(() =>
        this.prisma.reading.findMany({
          where: {
            id_hardware: +id_hardware,
            ...this.buildPrismaWhereClause(query),
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

    const {data, ...rest} = await debug(() => this.readingModel.aggregate([
      { $match: {
        id_hardware: +id_hardware
      } }, // Filter by id_hardware
      {
        $group: {
          _id: null, // Group all matching documents together
          total_energy: { $sum: '$energy_consumed' }, // Sum the energy_consumed field
        },
      },
    ]));

    const consume = data[0].total_energy || 0;

    return {
      ...rest,
      data: consume
    };
  }

  async findByUtilityCompany(
    id_utility_company: number,
    query: Record<string, any>,
    dbType: DbType,
  ) {
    if (dbType === 'sql') {
      const { data, ...rest } = await debug(() =>
        this.prisma.reading.findMany({
          where: {
            Hardware: {
              Residence: {
                id_utility_company: +id_utility_company,
              },
            },
            ...this.buildPrismaWhereClause(query),
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

    const readings = await debug(() =>
      this.readingModel
        .find({ 'Hardware.Residence.id_utility_company': id_utility_company })
        .exec(),
    );
    const consume = readings.data.reduce(
      (acc, reading) => acc + reading.energy_consumed,
      0,
    );
    return {
      consume,
      ...readings,
    };
  }

  async update(
    id: number,
    data: Prisma.ReadingUncheckedCreateInput,
    dbType: DbType,
  ) {
    if (dbType === 'sql')
      return debug(() =>
        this.prisma.reading.update({
          where: { id: +id },
          data,
        }),
      );

    const reading = await this.readingModel.findById(id).orFail();
    Object.assign(reading, data);
    return debug(() => reading.save());
  }

  private buildPrismaWhereClause(query: Record<string, any>) {
    const where: Prisma.ReadingWhereInput = {};
    where.energy_consumed = {};
    where.start_time = {};
    where.end_time = {};
    if (query.min_energy) where.energy_consumed.gte = Number(query.min_energy);
    if (query.max_energy) where.energy_consumed.lte = Number(query.max_energy);
    if (query.start_time) where.start_time.gte = new Date(query.start_time);
    if (query.end_time) where.end_time.lte = new Date(query.end_time);
    if (query.id_hardware) where.id_hardware = Number(query.id_hardware);

    return where;
  }

  private buildMongoWhereClause(query: Record<string, any>) {
    const where: Record<string, any> = {};

    if (query.min_energy || query.max_energy) {
      where.energy_consumed = {};
      if (query.min_energy) where.energy_consumed.$gte = Number(query.min_energy);
      if (query.max_energy) where.energy_consumed.$lte = Number(query.max_energy);
    }

    if (query.start_time || query.end_time) {
      where.start_time = {};
      if (query.start_time) where.start_time.$gte = new Date(query.start_time);
      if (query.end_time) where.start_time.$lte = new Date(query.end_time);
    }

    if(query.id_hardware) where.id_hardware = Number(query.id_hardware);


    return where;
  }
}
