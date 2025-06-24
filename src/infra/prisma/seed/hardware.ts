import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const possibleVersions = ['1.0.0', '1.1.0', '2.0.0'];
export const SEED_HARDWARES = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  firmware_version: faker.helpers.arrayElement(possibleVersions),
  hardware_version: faker.helpers.arrayElement(possibleVersions),
  nickname: 'Hardware ' + (index + 1),
  id_residence: index + 1,

}));
export async function hardwareSQLFactory(prisma: PrismaClient) {

  console.time('Insert Hardwares'); // Start timing
  await prisma.hardware.createMany({data: SEED_HARDWARES});
  console.log('\n✅ hardwares created: ' + SEED_HARDWARES.length);
  console.timeEnd('Insert Hardwares'); // End timing and log the duration

}