/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export async function up(db) {
    await db.createCollection("customers");
    await db.createCollection("readings");
    await db.createCollection("logs");
    await db.createCollection("utility_companies");
  }

  export async function down(db) {
    await db.collection("customers").drop();
    await db.collection("readings").drop();
    await db.collection("logs").drop();
    await db.collection("utility_companies").drop();
  }
