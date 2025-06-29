import { MongoClient } from 'mongodb';
import { generateCustomers, generateHardwares, generateReadings, generateResidences, SEED_COMPANIES, STATES } from '../../seed';
import * as dotenv from 'dotenv';
dotenv.config();

const MONGO_URI =
  process.env.DATABASE_URL_MONGO;

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
  const customers = generateCustomers();
  const residences = generateResidences();
  const hardwares = generateHardwares();
  const noSqlCustomers = customers.map((customer, index) => ({
    ...customer,
    residences: ({
      ...residences[index],
      state: STATES.find((state) => state.id === residences[index].id_state),
      id_customer: undefined,
      hardware: {
        ...hardwares[index],
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
  const readings = generateReadings('nosql'); // Generate readings data
  console.time('Insert Readings'); // Start timing
  await db.collection('readings').insertMany(readings);
  console.log('\n✅ readings created: ' + readings.length);
  console.timeEnd('Insert Readings'); // End timing and log the duration
}

async function main() {
  const client = new MongoClient(MONGO_URI!);

  try {
    await client.connect();
    const db = client.db('white_tariff');
    console.log('Starting MongoDB Seeding...\n');
    console.time('MongoDB Seeding'); // Start timing the entire seeding process
    await seedStates(db);
    await seedUtilityCompanies(db);
    await seedCustomers(db);
    await seedReadings(db);
    console.timeEnd('MongoDB Seeding'); // End timing the entire seeding process

    console.log('\n\nMongoDB Seeding completed! 🎉');
  } catch (error) {
    console.error('Error seeding MongoDB:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

main();
