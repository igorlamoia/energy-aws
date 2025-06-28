import { MongoClient } from 'mongodb';
import { SEED_CUSTOMERS } from '../../prisma/seed/customer';
import { SEED_COMPANIES } from '../../prisma/seed/utility-company';
import { RESIDENCES_SEED } from '../../prisma/seed/residence';
import { SEED_HARDWARES } from '../../prisma/seed/hardware';
import { generateReadings } from '../../prisma/seed/reading';
import { STATES } from '../../prisma/seed/states';

const MONGO_URI =
  process.env.DATABASE_URL_MONGO || 'mongodb://localhost:27017/white_tariff';

async function seedStates(db: any) {
  console.time('Insert States'); // Start timing
  await db.collection('states').insertMany(STATES);
  console.log('\n✅ states created: ' + STATES.length);
  console.timeEnd('Insert States'); // End timing and log the duration
}

async function seedUtilityCompanies(db: any) {
  console.time('Insert utility companies'); // Start timing
  await db.collection('utility_company').insertMany(SEED_COMPANIES);
  console.log('\n✅ utility companies created: ' + SEED_COMPANIES.length);
  console.timeEnd('Insert utility companies'); // End timing and log the duration
}

async function seedCustomers(db: any) {
  const noSqlCustomers = SEED_CUSTOMERS.map((customer, index) => ({
    ...customer,
    residences: ({
      ...RESIDENCES_SEED[index],
      state: STATES.find((state) => state.id === RESIDENCES_SEED[index].id_state),
      id_customer: undefined,
      hardware: {
        ...SEED_HARDWARES[index],
        id_residence: undefined,
      }, // Assuming hardware is seeded separately and linked by index
    })
  }));
  console.time('Insert customers'); // Start timing
  await db.collection('customers').insertMany(noSqlCustomers);
  console.log('\n✅ customers created: ' + noSqlCustomers.length);
  console.timeEnd('Insert customers'); // End timing and log the duration
}

async function seedReadings(db: any) {
  const readings = generateReadings();
  // id_customer, id_residence
  console.time('Insert readings'); // Start timing
  await db.collection('readings').insertMany(readings);
  console.log('\n✅ readings created: ' + readings.length);
  console.timeEnd('Insert readings'); // End timing and log the duration
}

async function main() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db('white_tariff');

    console.log('Connected to MongoDB!');

    await seedStates(db);
    await seedUtilityCompanies(db);
    await seedCustomers(db);
    await seedReadings(db);

    console.log('\n\nMongoDB Seeding completed! 🎉');
  } catch (error) {
    console.error('Error seeding MongoDB:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

main();
