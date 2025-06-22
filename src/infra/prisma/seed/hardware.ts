import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function hardwareSQLFactory(prisma: PrismaClient) {
  const possibleVersions = ['1.0.0', '1.1.0', '2.0.0'];
  const hardwares = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    firmware_version: faker.helpers.arrayElement(possibleVersions),
    hardware_version: faker.helpers.arrayElement(possibleVersions),
    nickname: 'Hardware ' + (index + 1),
    id_residence: index + 1,

  }));

  console.time('Insert Hardwares'); // Start timing
  await prisma.hardware.createMany({data: hardwares});
  console.log('\n✅ hardwares created: ' + hardwares.length);
  console.timeEnd('Insert Hardwares'); // End timing and log the duration

}