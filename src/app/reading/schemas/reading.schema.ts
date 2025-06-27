import { z } from 'zod';
// import { zodToOpenAPI } from '@anatine/zod-openapi';
import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';


extendZodWithOpenApi(z);

export const CreateReadingZodSchema = z.object({
  energy_consumed: z.number().int().nonnegative().openapi({
    title: 'Energy Consumed',
    description: 'The amount of energy consumed in kWh',
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
  id_hardware: z.number().int().positive(),
});


// pass individualis:
// .openapi({
//   title: 'Hardware ID',
//   description: 'ID of the hardware associated with the reading',
//   example: 1,
// })

export class CreateReadingSchema extends createZodDto(CreateReadingZodSchema) {}
export type CreateReadingDto = z.infer<typeof CreateReadingZodSchema>;


// const Api = {type: CreateReadingSchema , examples : {
//   CreateReadingExample: {
//     summary: 'Create a new reading',
//     description: 'Create a new reading with the specified parameters.',
//     value: {
//       energy_consumed: 250,
//       current_value: 50,
//       voltage_value: 230,
//       start_time: '2023-10-01T12:00:00Z',
//       end_time: '2023-10-01T14:00:00Z',
//       id_hardware: 1,
//     },
//   },
//   CreatingOther: {
//     summary: 'Create another reading',
//     description: 'Create another reading with different parameters.',
//     value: {
//       energy_consumed: 300,
//       current_value: 60,
//       voltage_value: 240,
//       start_time: '2023-10-01T13:00:00Z',
//       end_time: '2023-10-01T15:00:00Z',
//       id_hardware: 2,
//     },
//   }
// }}