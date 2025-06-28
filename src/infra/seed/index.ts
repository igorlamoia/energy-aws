import { faker } from '@faker-js/faker/locale/pt_BR';
import { generateCPF } from '../../utils/generator';

const LENGTH = 200; // Default length for generating data
const READINGS_LENGTH = 1000000; // Total readings to create

export const generateCustomers = (length = LENGTH) => Array.from({ length }, (_, index) => ({
  id: index + 1,
  name: faker.person.fullName(),
  cpf_cnpj: generateCPF(),
  email: faker.internet.email(),
  is_active: faker.datatype.boolean(),
  mobile_phone: faker.phone.number({ style: 'international' }), // formato brasileiro
}));


const possibleVersions = ['1.0.0', '1.1.0', '2.0.0'];
export const generateHardwares = (length = LENGTH) => Array.from({ length }, (_, index) => ({
  id: index + 1,
  firmware_version: faker.helpers.arrayElement(possibleVersions),
  hardware_version: faker.helpers.arrayElement(possibleVersions),
  nickname: 'Hardware ' + (index + 1),
  id_residence: index + 1,

}));


const INTERVAL = 3000; // 3 seconds in milliseconds
const DAYS = 2 * 24 * 60 * 60; // 2 days in milliseconds
export const generateReadings = (db: 'sql'|'nosql' = 'sql') => {
  const readings: any[]  = [];
  const refDate = new Date(Date.now() - DAYS); // Reference date for past readings
  const residences = generateResidences();
  const possibleIds = residences.map((residence) => residence.id);
  for (let i = 0; i < READINGS_LENGTH; i++) {
    const id_residence = faker.helpers.arrayElement(possibleIds); // Shuffle hardware IDs
    const start_time = new Date(refDate.getTime() + i * INTERVAL); // 3s INTERVAL
    const end_time = new Date(start_time.getTime() + INTERVAL);
    if( db === 'nosql') {
    readings.push({
      id_residence,
      id_state: +residences[id_residence - 1].id_state, // Assuming state is linked to residence
      id_utility_company: +residences[id_residence - 1].id_utility_company, // Assuming utility company is linked to residence
      energy_consumed: +faker.number.int({ min: 0, max: 1000 }),
      current_value: +faker.number.int({ min: 0, max: 100 }),
      voltage_value: +faker.helpers.arrayElement([110, 220, 380]),
      start_time,
      end_time,
    });
  } else {
    readings.push({
        id_hardware: id_residence,
        energy_consumed: faker.number.int({ min: 0, max: 1000 }),
        current_value: faker.number.int({ min: 0, max: 100 }),
        voltage_value: faker.helpers.arrayElement([110, 220, 380]),
        start_time,
        end_time,
      });
    }
  }

  return readings;
}


const possibleStates = [31, 33, 35]; // MG, RJ, SP
const possibleUtilityCompanies = [1, 3, 4]; // MG, RJ, SP
export const generateResidences = (length = LENGTH) => Array.from({ length }, (_, index) => ({
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

export const STATES = [
  { id: 11, name: 'Rondônia', abbreviation: 'RO' },
  { id: 12, name: 'Acre', abbreviation: 'AC' },
  { id: 13, name: 'Amazonas', abbreviation: 'AM' },
  { id: 14, name: 'Roraima', abbreviation: 'RR' },
  { id: 15, name: 'Pará', abbreviation: 'PA' },
  { id: 16, name: 'Amapá', abbreviation: 'AP' },
  { id: 17, name: 'Tocantins', abbreviation: 'TO' },
  { id: 21, name: 'Maranhão', abbreviation: 'MA' },
  { id: 22, name: 'Piauí', abbreviation: 'PI' },
  { id: 23, name: 'Ceará', abbreviation: 'CE' },
  { id: 24, name: 'Rio Grande do Norte', abbreviation: 'RN' },
  { id: 25, name: 'Paraíba', abbreviation: 'PB' },
  { id: 26, name: 'Pernambuco', abbreviation: 'PE' },
  { id: 27, name: 'Alagoas', abbreviation: 'AL' },
  { id: 28, name: 'Sergipe', abbreviation: 'SE' },
  { id: 29, name: 'Bahia', abbreviation: 'BA' },
  { id: 31, name: 'Minas Gerais', abbreviation: 'MG' },
  { id: 32, name: 'Espírito Santo', abbreviation: 'ES' },
  { id: 33, name: 'Rio de Janeiro', abbreviation: 'RJ' },
  { id: 35, name: 'São Paulo', abbreviation: 'SP' },
  { id: 41, name: 'Paraná', abbreviation: 'PR' },
  { id: 42, name: 'Santa Catarina', abbreviation: 'SC' },
  { id: 43, name: 'Rio Grande do Sul', abbreviation: 'RS' },
  { id: 50, name: 'Mato Grosso do Sul', abbreviation: 'MS' },
  { id: 51, name: 'Mato Grosso', abbreviation: 'MT' },
  { id: 52, name: 'Goiás', abbreviation: 'GO' },
  { id: 53, name: 'Distrito Federal', abbreviation: 'DF' },
];


const hour = 60 * 60 * 1000; // 1 hour in milliseconds
export const SEED_COMPANIES = [
  {
    id: 1,
    name: 'Energisa S.A. MG',
    intermediate_rate: 15,
    start_first_intermediate_time: hour * 6,
    end_first_intermediate_time: hour * 12,
    start_second_intermediate_time: hour * 13,
    end_second_intermediate_time: hour * 15,
    start_peak_time: hour * 18,
    end_peak_time: hour * 20,
    id_state: 31, // Minas Gerais
    standard_rate: 10,
    peak_rate: 20,
    off_peak_rate: 5,
  },
  {
    id: 2,
    name: 'Copel Distribuição S.A. PR',
    intermediate_rate: 12,
    start_first_intermediate_time: hour * 7,
    end_first_intermediate_time: hour * 13,
    start_second_intermediate_time: hour * 14,
    end_second_intermediate_time: hour * 16,
    start_peak_time: hour * 19,
    end_peak_time: hour * 21,
    id_state: 41, // Paraná
    standard_rate: 8,
    peak_rate: 18,
    off_peak_rate: 4,
  },
  {
    id: 3,
    name: 'Light S.A. RJ',
    intermediate_rate: 14,
    start_first_intermediate_time: hour * 5,
    end_first_intermediate_time: hour * 11,
    start_second_intermediate_time: hour * 12,
    end_second_intermediate_time: hour * 14,
    start_peak_time: hour * 17,
    end_peak_time: hour * 19,
    id_state: 33, // Rio de Janeiro
    standard_rate: 9,
    peak_rate: 22,
    off_peak_rate: 6,
  },
  {
    id: 4,
    name: 'Enel Distribuição SP',
    intermediate_rate: 13,
    start_first_intermediate_time: hour * 8,
    end_first_intermediate_time: hour * 14,
    start_second_intermediate_time: hour * 15,
    end_second_intermediate_time: hour * 17,
    start_peak_time: hour * 20,
    end_peak_time: hour * 22,
    id_state: 35, // São Paulo
    standard_rate: 11,
    peak_rate: 23,
    off_peak_rate: 7,
  }
]