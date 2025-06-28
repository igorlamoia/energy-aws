import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Prisma } from '@prisma/client';
import { Model } from 'mongoose';
import { debug } from 'src/core/helpers';
import { DbType } from 'src/core/interfaces';
import {
  UtilityCompany,
  UtilityCompanyDocument,
} from 'src/infra/mongo/schemas';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class UtilityCompanyService {
  constructor(
    private prisma: PrismaService,
    @InjectModel(UtilityCompany.name)
    private utilityCompanyModel: Model<UtilityCompanyDocument>,
  ) {}

  async create(dbType: DbType, dto: Prisma.UtilityCompanyUncheckedCreateInput) {
    if (dbType === 'sql')
      return debug(() => this.prisma.utilityCompany.create({ data: dto }));

    return debug(() => new this.utilityCompanyModel(dto).save());
  }

  async findAll(dbType: DbType) {
    if (dbType === 'sql')
      return debug(() => this.prisma.utilityCompany.findMany());

    return debug(() => this.utilityCompanyModel.find().exec());
  }

  async findOne(dbType: DbType, id: number) {
    if (dbType === 'sql')
      return debug(() =>
        this.prisma.utilityCompany.findUniqueOrThrow({ where: { id } }),
      );

    return debug(() => this.utilityCompanyModel.findById(id).exec());
  }

  async update(
    dbType: DbType,
    id: number,
    dto: Prisma.UtilityCompanyUncheckedUpdateInput,
  ) {
    if (dbType === 'sql')
      return debug(() =>
        this.prisma.utilityCompany.update({ where: { id }, data: dto }),
      );

    return debug(() =>
      this.utilityCompanyModel.findByIdAndUpdate(id, dto, { new: true }).exec(),
    );
  }

  async remove(dbType: DbType, id: number) {
    if (dbType === 'sql')
      return debug(() => this.prisma.utilityCompany.delete({ where: { id } }));

    return debug(() => this.utilityCompanyModel.findByIdAndDelete(id).exec());
  }

  async findByStateId(dbType: DbType, id_state: number) {
    if (dbType === 'sql')
      return debug(() =>
        this.prisma.utilityCompany.findMany({ where: { id_state } }),
      );

    return debug(() => this.utilityCompanyModel.find({ id_state }).exec());
  }
}
