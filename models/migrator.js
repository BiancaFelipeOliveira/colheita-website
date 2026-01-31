import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

const defaultMigrationOptions = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  log: () => {},
  migrationsTable: "pgmigrations",
};

async function runPendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getDb();

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient: dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  runPendingMigrations,
};

export default migrator;
