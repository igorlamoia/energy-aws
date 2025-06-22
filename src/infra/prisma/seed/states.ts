import { PrismaClient } from '@prisma/client';

export async function statesSQLFactory(
  prisma: PrismaClient = new PrismaClient(),
) {
    await prisma.state.deleteMany();
    console.time('Insert States'); // Start timing
    await prisma.state.createMany({data: STATES});
    console.log('\n✅ states created: ' + STATES.length);
    console.timeEnd('Insert States'); // End timing and log the duration
}

export const getIdsStates = () => STATES.map((state) => state.id);
const STATES = [
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