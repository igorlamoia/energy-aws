import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const possibleStates = [31, 33, 35]; // MG, RJ, SP
const possibleUtilityCompanies = [1, 3, 4]; // MG, RJ, SP

export const RESIDENCES_SEED = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1, // Assign id from 1 to 10
  city: faker.location.city(),
  id_state: faker.helpers.arrayElement(possibleStates),
  nickname: `Residence ${index + 1}`,
  street: faker.location.street(),
  number: +faker.location.buildingNumber(),
  complement: '',
  id_utility_company: faker.helpers.arrayElement(possibleUtilityCompanies),
  neighborhood: faker.location.county(),
  postal_code: faker.location.zipCode('########'),
  id_customer: index + 1, // Assign id_customer from 1 to 10
}));

export async function residenceSQLFactory(prisma: PrismaClient) {

  console.time('Insert Residences'); // Start timing
  await prisma.residence.createMany({ data: RESIDENCES_SEED });
  console.log('\n✅ residences created: ' + RESIDENCES_SEED.length);
  console.timeEnd('Insert Residences'); // End timing and log the duration
}