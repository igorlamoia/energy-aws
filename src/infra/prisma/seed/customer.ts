import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { generateCPF } from '../../../utils/generator';

export async function customerFactory(prisma: PrismaClient) {
  const customers = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    cpf_cnpj: generateCPF(),
    email: faker.internet.email(),
    is_active: faker.datatype.boolean(),
    mobile_phone: faker.phone.number({ style: 'international' }), // formato brasileiro
  }));

  console.time('Insert Customers'); // Start timing
  await prisma.customer.createMany({ data: customers });
  console.log('\n✅ customers created: ' + customers.length);
  console.timeEnd('Insert Customers'); // End timing and log the duration
}
