import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const possibleIds = Array.from({ length: 10 }, (_, index) => index + 1);

const INTERVAL = 3000; // 3 seconds in milliseconds
const DAYS = 2 * 24 * 60 * 60; // 2 days in milliseconds
const TOTAL = 10000; // Total readings to create

export async function readingSQLFactory(prisma: PrismaClient) {
  const readings = generateReadings(TOTAL); // Generate readings data
  console.time('Insert Readings'); // Start timing
  await prisma.reading.createMany({ data: readings });
  console.log('\n✅ readings created: ' + readings.length);
  console.timeEnd('Insert Readings'); // End timing and log the duration
}

export const generateReadings = (total = TOTAL, days = DAYS, interval = INTERVAL) => {
  const readings: Prisma.ReadingUncheckedCreateInput[] = [];
  const refDate = new Date(Date.now() - days); // Reference date for past readings

  for (let i = 0; i < total; i++) {
    const id_hardware = faker.helpers.arrayElement(possibleIds); // Shuffle hardware IDs
    const start_time = new Date(refDate.getTime() + i * interval); // 3s interval
    const end_time = new Date(start_time.getTime() + interval);

    readings.push({
      id_hardware,
      energy_consumed: faker.number.int({ min: 0, max: 1000 }),
      current_value: faker.number.int({ min: 0, max: 100 }),
      voltage_value: faker.helpers.arrayElement([110, 220, 380]),
      start_time,
      end_time,
    });
  }
  return readings;
}