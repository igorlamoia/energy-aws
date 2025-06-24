import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { generateCPF } from '../../../utils/generator';

export const SEED_CUSTOMERS = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  cpf_cnpj: generateCPF(),
  email: faker.internet.email(),
  is_active: faker.datatype.boolean(),
  mobile_phone: faker.phone.number({ style: 'international' }), // formato brasileiro
}));

export async function customerFactory(prisma: PrismaClient) {
  console.time('Insert Customers'); // Start timing
  await prisma.customer.createMany({ data: SEED_CUSTOMERS });
  console.log('\n✅ customers created: ' + SEED_CUSTOMERS.length);
  console.timeEnd('Insert Customers'); // End timing and log the duration
}
