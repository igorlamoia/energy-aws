/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export async function up(db) {
    await db.collection("readings").createIndexes([
      { key: { id_hardware: 1 } },
      { key: { id_residence: 1 } },
      { key: { id_customer: 1 } },
      { key: { start_time: 1 } },
      { key: { end_time: 1 } }
    ]);

    await db.collection("customers").createIndexes([
      { key: { cpf_cnpj: 1 }, unique: true },
      { key: { email: 1 }, unique: true, sparse: true }
    ]);

    await db.collection("logs").createIndexes([
      { key: { route: 1 } },
      { key: { request_timestamp: 1 } }
    ]);

    await db.collection("utility_company").createIndexes([
        { key: { id: 1 }, unique: true },
        { key: { name: 1 } }
      ]);
  }

  export async function down(db) {
    await db.collection("readings").dropIndexes();
    await db.collection("customers").dropIndexes();
    await db.collection("logs").dropIndexes();
    await db.collection("utility_company").dropIndexes();

  }
