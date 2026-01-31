import { createRouter } from "next-connect";
import database from "infra/database";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresVersion = await database.query("SHOW server_version;");

  const postgresName = process.env.POSTGRES_DB;
  const openedPostgresConnections = await database.query({
    text: "SELECT COUNT(*) AS opened_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [postgresName],
  });

  const maxPostgresConnections = await database.query("SHOW max_connections;");

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      postgres: {
        max_connections: parseInt(
          maxPostgresConnections.rows[0].max_connections,
        ),
        opened_connections: parseInt(
          openedPostgresConnections.rows[0].opened_connections,
        ),
        version: postgresVersion.rows[0].server_version,
      },
    },
  });
}
