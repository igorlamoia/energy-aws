import { ApiPropertyOptional } from "@nestjs/swagger";

export class QueryParams {
  @ApiPropertyOptional({ description: 'Database to query', example: 'nosql' })
  db?: 'sql' | 'nosql';
}
