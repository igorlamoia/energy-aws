import { z, ZodError, ZodIssue } from 'zod';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseQueryParams } from 'src/core/schema';

extendZodWithOpenApi(z);

export const CreateReadingZodSchema = z.object({
  energy_consumed: z.number().int().nonnegative().openapi({
    title: 'Energy Consumed',
    description: 'The amount of energy consumed',
    example: 150,
  }),
  current_value: z.number().int().nonnegative().openapi({
    title: 'Current Value',
    description: 'The current value of the reading in kWh',
    example: 50,
  }),
  voltage_value: z.number().int().nonnegative().openapi({
    title: 'Voltage Value',
    description: 'The voltage value of the reading in volts',
    example: 230,
  }),
  start_time: z.string().openapi({
    description: 'Start time of the reading in ISO 8601 format',
    example: '2023-10-01T12:00:00Z',
  }),
  // .regex(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, 'Invalid time'),
  end_time: z.string().openapi({
    description: 'End time of the reading in ISO 8601 format',
    example: '2023-10-01T14:00:00Z',
  }),
  // .regex(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, 'Invalid time'),
  id_hardware: z.number().int().positive().optional(),
  id_residence: z.number().int().positive().optional(),
  id_utility_company: z.number().int().positive().optional(),
  id_state: z.number().int().positive().optional(),
});



export class ReadingQueryParams extends BaseQueryParams {
  @ApiPropertyOptional()
  id_hardware?: number;
  @ApiPropertyOptional()
  id_residence?: number;
  @ApiPropertyOptional()
  id_utility_company?: number;
  @ApiPropertyOptional()
  id_state?: number;
  @ApiPropertyOptional()
  min_energy?: number;
  @ApiPropertyOptional()
  max_energy?: number;
  @ApiPropertyOptional({
    description: 'Start time for filtering readings',
    example: '2025-01-01T12:00:00Z',
  })
  start_time?: string; // ISO 8601 format
  @ApiPropertyOptional({
    description: 'End time for filtering readings',
    example: '2025-06-01T12:00:00Z',
  })
  end_time?: string; // ISO 8601 format
}

// pass individualis:
// .openapi({
//   title: 'Hardware ID',
//   description: 'ID of the hardware associated with the reading',
//   example: 1,
// })
// 👇 Reusable ApiResponse decorator
// export const CreateReadingResponse = ApiResponse({
//   status: 201,
//   description: 'Reading created successfully',
//   schema: {
//     example: {
//       message: 'Reading created successfully',
//       energy_consumed: 120,
//       current_value: 10,
//       voltage_value: 220,
//       start_time: '2025-06-26T12:00:00Z',
//       end_time: '2025-06-26T12:03:00Z',
//       id_hardware: 1,
//     },
//   },
// });
export class CreateReadingSchema extends createZodDto(CreateReadingZodSchema) {}
export type CreateReadingDto = z.infer<typeof CreateReadingZodSchema>;

export const CreateUpdateReading = {
  type: CreateReadingSchema,
  examples: {
    SQL: {
      summary: 'Create a SQL reading',
      description: 'Create with hardware',
      value: {
        id_hardware: 1,
        energy_consumed: 250,
        current_value: 50,
        voltage_value: 230,
        start_time: '2025-10-01T12:00:00Z',
        end_time: '2025-10-01T14:00:00Z',
      },
    },
    NoSQL: {
      summary: 'Create a NoSQL reading',
      description: 'Create with id_residence, id_state, and id_utility_company',
      value: {
        id_residence: 8,
        id_state: 33,
        id_utility_company: 3,
        energy_consumed: 735,
        current_value: 21,
        voltage_value: 110,
        start_time: '2025-06-28T21:50:18.450Z',
        end_time: '2025-06-28T21:50:21.450Z',
      },
    },
  },
};


export function validateConditionalFields(dto: CreateReadingDto, db?: string): void {
  const issues: ZodIssue[] = [];

  const requiredFieldsByDb: Record<string, { field: keyof CreateReadingDto; message: string }[]> = {
    nosql: [
      { field: 'id_residence', message: 'id_residence is required when db=nosql' },
      { field: 'id_utility_company', message: 'id_utility_company is required when db=nosql' },
      { field: 'id_state', message: 'id_state is required when db=nosql' },
    ],
    sql: [
      { field: 'id_hardware', message: 'id_hardware is required when db=sql' },
    ],
  };

  if (db && requiredFieldsByDb[db]) {
    requiredFieldsByDb[db].forEach(({ field, message }) => {
      if (dto[field] == null) {
        issues.push({
          path: [field],
          message,
          code: 'custom',
        });
      }
    });
  }

  if (issues.length > 0)
    throw new ZodError(issues);

}