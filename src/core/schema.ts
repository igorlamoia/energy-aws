import { ApiPropertyOptional } from "@nestjs/swagger";
import { DbType } from "./interfaces";

export class BaseQueryParams {
  @ApiPropertyOptional({ description: 'Database to query',
    enum: ['nosql', 'sql'],
    example: 'nosql' })
  db?: DbType;
}
