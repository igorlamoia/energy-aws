import { ApiPropertyOptional } from "@nestjs/swagger";

export class BaseQueryParams {
  @ApiPropertyOptional({ description: 'Database to query', example: 'nosql' })
  db?: 'sql' | 'nosql';
}
