import { PrismaClient } from '@prisma/client';

export async function utilityCompanySQLFactory(prisma: PrismaClient) {
  console.time('Insert Utility Companies'); // Start timing
  await prisma.utilityCompany.createMany({data: companies})
  console.log('\n✅ utility companies created: ' + companies.length);
  console.timeEnd('Insert Utility Companies'); // End timing and log the duration
}

const hour = 60 * 60 * 1000; // 1 hour in milliseconds
const companies = [
  {
    id: 1,
    name: 'Energisa S.A. MG',
    intermediate_rate: 15,
    start_first_intermediate_time: hour * 6,
    end_first_intermediate_time: hour * 12,
    start_second_intermediate_time: hour * 13,
    end_second_intermediate_time: hour * 15,
    start_peak_time: hour * 18,
    end_peak_time: hour * 20,
    id_state: 31, // Minas Gerais
    standard_rate: 10,
    peak_rate: 20,
    off_peak_rate: 5,
  },
  {
    id: 2,
    name: 'Copel Distribuição S.A. PR',
    intermediate_rate: 12,
    start_first_intermediate_time: hour * 7,
    end_first_intermediate_time: hour * 13,
    start_second_intermediate_time: hour * 14,
    end_second_intermediate_time: hour * 16,
    start_peak_time: hour * 19,
    end_peak_time: hour * 21,
    id_state: 41, // Paraná
    standard_rate: 8,
    peak_rate: 18,
    off_peak_rate: 4,
  },
  {
    id: 3,
    name: 'Light S.A. RJ',
    intermediate_rate: 14,
    start_first_intermediate_time: hour * 5,
    end_first_intermediate_time: hour * 11,
    start_second_intermediate_time: hour * 12,
    end_second_intermediate_time: hour * 14,
    start_peak_time: hour * 17,
    end_peak_time: hour * 19,
    id_state: 33, // Rio de Janeiro
    standard_rate: 9,
    peak_rate: 22,
    off_peak_rate: 6,
  },
  {
    id: 4,
    name: 'Enel Distribuição SP',
    intermediate_rate: 13,
    start_first_intermediate_time: hour * 8,
    end_first_intermediate_time: hour * 14,
    start_second_intermediate_time: hour * 15,
    end_second_intermediate_time: hour * 17,
    start_peak_time: hour * 20,
    end_peak_time: hour * 22,
    id_state: 35, // São Paulo
    standard_rate: 11,
    peak_rate: 23,
    off_peak_rate: 7,
  }
]