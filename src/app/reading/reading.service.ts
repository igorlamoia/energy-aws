import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { debug } from 'src/core/helpers';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Reading, ReadingDocument } from 'src/infra/mongo/schemas';
import { DbType } from 'src/core/interfaces';
import { CreateReadingDto, ReadingQueryParams } from './schemas/reading.schema';

@Injectable()
export class ReadingService {
  constructor(
    private prisma: PrismaService,
    @InjectModel(Reading.name)
    private readonly readingModel: Model<ReadingDocument>,
  ) {}

  async create(data: CreateReadingDto, dbType?: string) {
    if (dbType === 'sql') {
      const sqlData = data as Prisma.ReadingUncheckedCreateInput ;
      return debug(() => this.prisma.reading.create({ data: sqlData }));
    }
    const reading = new this.readingModel(data);
    return debug(() => reading.save());
  }

  async findAll(query: ReadingQueryParams) {
    if (query.db === 'sql') return this.findAllSql(query);
    return this.findAllNoSql(query);
  }

  private async findAllSql(query: ReadingQueryParams) {
    const { data, ...rest } = await debug(() =>
      this.prisma.reading.aggregate({
        _sum: { energy_consumed: true },
        _count: true,
        where: this.buildPrismaWhereClause(query),
      }),
    );

    return {
      ...rest,
      data: {
        consume: data._sum?.energy_consumed || 0,
        count: data._count || 0,
      },
    };
  }

  private async findAllNoSql(query: ReadingQueryParams) {
    const {data, ...rest} = await debug(() =>
      this.readingModel
        .aggregate([
          { $match: this.buildMongoWhereClause(query) },
          {
            $group: {
              _id: null,
              sum: { $sum: '$energy_consumed' },
              count: { $sum: 1 },
            },
          },
        ])
        .exec(),
    );

    const values = data[0] || { sum: 0, count: 0 };

    return {
      ...rest,
      data: {
        consume: values?.sum || 0,
        count: values?.count || 0,
      },
    };
  }

  async findOne(id: string, dbType: DbType) {
    if (dbType === 'sql')
      return debug(() =>
        this.prisma.reading.findUnique({ where: { id: +id } }),
      );

    return debug(() => this.readingModel.findById(id).exec());
  }


  async update(
    id: string,
    data: CreateReadingDto,
    dbType: DbType,
  ) {
    if (dbType === 'sql') {
      const sqlData = data as Prisma.ReadingUncheckedCreateInput ;
      return debug(() => this.prisma.reading.update({ where: { id: +id }, data: sqlData }));
    }

    return debug(() => this.readingModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec());
  }

  async delete(id: string, dbType: DbType) {
    if (dbType === 'sql')
      return debug(() => this.prisma.reading.delete({ where: { id: +id } }));

    return debug(() => this.readingModel.findByIdAndDelete(id).exec());
  }


  private buildPrismaWhereClause(query: ReadingQueryParams) {
    const where: Prisma.ReadingWhereInput = {};
    where.energy_consumed = {};
    where.start_time = {};
    where.end_time = {};
    if (query.min_energy) where.energy_consumed.gte = Number(query.min_energy);
    if (query.max_energy) where.energy_consumed.lte = Number(query.max_energy);
    if (query.start_time) where.start_time.gte = new Date(query.start_time);
    if (query.end_time) where.end_time.lte = new Date(query.end_time);
    if (query.id_hardware) where.id_hardware = Number(query.id_hardware);
    where.Hardware = {
      Residence: {
        ...(query.id_residence && { id: Number(query.id_residence) }),
        ...(query.id_state && { id_state: Number(query.id_state) }),
        ...(query.id_utility_company && {
          id_utility_company: Number(query.id_utility_company),
        }),
      },
    };

    return where;
  }

  private buildMongoWhereClause(query: ReadingQueryParams) {
    const where: Record<string, any> = {};

    if (query.min_energy || query.max_energy) {
      where.energy_consumed = {};
      if (query.min_energy)
        where.energy_consumed.$gte = Number(query.min_energy);
      if (query.max_energy)
        where.energy_consumed.$lte = Number(query.max_energy);
    }

    if (query.start_time || query.end_time) {
      where.start_time = {};
      if (query.start_time) where.start_time.$gte = new Date(query.start_time);
      if (query.end_time) where.start_time.$lte = new Date(query.end_time);
    }

    if (query.id_residence) where.id_residence = Number(query.id_residence);
    // 'Hardware.Residence.id_utility_company': id_utility_company
    if (query.id_utility_company)
      where.id_utility_company = Number(query.id_utility_company);
    if (query.id_state) where.id_state = Number(query.id_state);

    // NOT IMPLEMENTED YET
    // if (query.id_hardware) where.id_hardware = Number(query.id_hardware);

    return where;
  }
}

// To calculate the total energy consumed across all readings, we can use an aggregation pipeline in MongoDB.
// const {data, ...rest} = await debug(() => this.readingModel.aggregate([
//   { $match: {
//     ...this.buildMongoWhereClause(query), // Build the where clause based on query parameters
//   } }, // Filter by id_hardware
//   {
//     $group: {
//       _id: null, // Group all matching documents together
//       total_energy: { $sum: '$energy_consumed' }, // Sum the energy_consumed field
//     },
//   },
// ]));
