import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const hour = 60 * 60 * 1000; // 1 hour in milliseconds

async function main() {
  const customer = await prisma.customer.create({
    data: {
      name: 'John Doe',
      cpf_cnpj: '12345678905',
      email: 's@gmail.com',
      is_active: true,
      mobile_phone: '321234567',
    },
  });
  await prisma.state.createMany({
    data: [
      { id: 1, abbreviation: 'MG', name: 'Minas Gerais' },
      { id: 2, abbreviation: 'SP', name: 'São Paulo' },
      { id: 3, abbreviation: 'RJ', name: 'Rio de Janeiro' },
    ],
  });

  const utilityCompany = await prisma.utilityCompany.create({
    data: {
      name: 'Sample Utility Company',
      intermediate_rate: 15,
      start_first_intermediate_time: hour * 1,
      end_first_intermediate_time: hour * 12,
      start_second_intermediate_time: hour * 13,
      end_second_intermediate_time: hour * 18,
      start_peak_time: hour * 18,
      end_peak_time: hour * 21,
      id_state: 1, // Assuming state with id 1 exists
      standard_rate: 10,
      peak_rate: 20,
      off_peak_rate: 5,
    },
  });

  // Seed Residence
  const residence = await prisma.residence.create({
    data: {
      city: 'Sample City',
      id_state: 1,
      nickname: 'My Residence',
      street: '123 Sample St',
      number: 456,
      complement: 'Apt 789',
      id_utility_company: utilityCompany.id,
      neighborhood: 'Sample Neighborhood',
      postal_code: '12345-678',
      id_customer: customer.id,
    },
  });

  // Seed Hardware
  const hardware = await prisma.hardware.create({
    data: {
      firmware_version: '1.0.0',
      hardware_version: '1.0.0',
      nickname: 'Main Hardware',
      id_residence: residence.id,
    },
  });

  // Seed Readings
  await prisma.reading.createMany({
    data: [
      {
        energy_consumed: 100,
        current_value: 10,
        voltage_value: 220,
        start_time: new Date(),
        end_time: new Date(),
        id_hardware: hardware.id,
      },
      {
        energy_consumed: 200,
        current_value: 20,
        voltage_value: 220,
        start_time: new Date(),
        end_time: new Date(),
        id_hardware: hardware.id,
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
