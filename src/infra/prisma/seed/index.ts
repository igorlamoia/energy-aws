import { PrismaClient } from '@prisma/client';
import {
  generateCustomers,
  generateHardwares,
  generateReadings,
  generateResidences,
  SEED_COMPANIES,
  STATES,
} from '../../seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting Prisma Seeding...\n');
  console.time('Prisma Seeding'); // Start timing the entire seeding process
  await customerFactory(prisma);
  await statesSQLFactory(prisma);
  await utilityCompanySQLFactory(prisma);
  await residenceSQLFactory(prisma);
  await hardwareSQLFactory(prisma);
  await readingSQLFactory(prisma);
  console.log('\n\nSeeding completed! 🎉\n');
  console.timeEnd('Prisma Seeding'); // End timing the entire seeding process
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

async function customerFactory(prisma: PrismaClient) {
  const customers = generateCustomers();
  console.time('Insert Customers'); // Start timing
  await prisma.customer.createMany({ data: customers });
  console.log('\n✅ customers created: ' + customers.length);
  console.timeEnd('Insert Customers'); // End timing and log the duration
}

async function hardwareSQLFactory(prisma: PrismaClient) {
  const hardwares = generateHardwares();
  console.time('Insert Hardwares'); // Start timing
  await prisma.hardware.createMany({ data: hardwares });
  console.log('\n✅ hardwares created: ' + hardwares.length);
  console.timeEnd('Insert Hardwares'); // End timing and log the duration
}

async function readingSQLFactory(prisma: PrismaClient) {
  const readings = generateReadings(); // Generate readings data
  console.time('Insert Readings'); // Start timing
  await prisma.reading.createMany({ data: readings });
  console.log('\n✅ readings created: ' + readings.length);
  console.timeEnd('Insert Readings'); // End timing and log the duration
}

async function residenceSQLFactory(prisma: PrismaClient) {
  const residences = generateResidences();
  console.time('Insert Residences');
  await prisma.residence.createMany({ data: residences });
  console.log('\n✅ residences created: ' + residences.length);
  console.timeEnd('Insert Residences');
}

async function statesSQLFactory(prisma: PrismaClient = new PrismaClient()) {
  console.time('Insert States'); // Start timing
  await prisma.state.deleteMany();
  await prisma.state.createMany({ data: STATES });
  console.log('\n✅ states created: ' + STATES.length);
  console.timeEnd('Insert States'); // End timing and log the duration
}

async function utilityCompanySQLFactory(prisma: PrismaClient) {
  console.time('Insert Utility Companies'); // Start timing
  await prisma.utilityCompany.createMany({ data: SEED_COMPANIES });
  console.log('\n✅ utility companies created: ' + SEED_COMPANIES.length);
  console.timeEnd('Insert Utility Companies'); // End timing and log the duration
}
