import { PrismaClient } from '@prisma/client';
import { statesSQLFactory } from './states';
import { utilityCompanySQLFactory } from './utility-company';
import { customerFactory } from './customer';
import { residenceSQLFactory } from './residence';
import { hardwareSQLFactory } from './hardware';
import { readingSQLFactory } from './reading';

const prisma = new PrismaClient();


async function main() {
  await customerFactory(prisma);
  await statesSQLFactory(prisma);
  await utilityCompanySQLFactory(prisma);
  await residenceSQLFactory(prisma);
  await hardwareSQLFactory(prisma);
  await readingSQLFactory(prisma);

  console.log('\n\nSeeding completed! 🎉');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
