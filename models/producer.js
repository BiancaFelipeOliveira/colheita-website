import database from "infra/database";
import { ValidationError, NotFoundError } from "infra/errors";

async function create(producerInputValues) {
  if (
    producerInputValues.name === undefined ||
    producerInputValues.location === undefined ||
    producerInputValues.phone === undefined
  ) {
    throw new ValidationError({
      message: "Some values are missing.",
      action: "You must provide values for name, location and phone.",
    });
  }

  const newProducer = await runInsertQuery({
    name: producerInputValues.name,
    location: producerInputValues.location,
    phone: producerInputValues.phone,
  });
  return newProducer;

  async function runInsertQuery(producerInputValues) {
    const results = await database.query({
      text: `
        INSERT INTO
          producers (name, location, phone)
        VALUES
          ($1, $2, $3)
        RETURNING
          *
        ;`,
      values: [
        producerInputValues.name,
        producerInputValues.location,
        producerInputValues.phone,
      ],
    });

    return results.rows[0];
  }
}

async function listAll() {
  const producersFound = await runSelectQuery();

  return producersFound;

  async function runSelectQuery() {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          producers
        ;`,
    });

    return results.rows;
  }
}

async function findOneById(id) {
  const producersFound = await runSelectQuery(id);

  return producersFound;

  async function runSelectQuery(id) {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          producers
        WHERE
          id = $1
        LIMIT
          1
        ;`,
      values: [id],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "The provided id was not found in the system.",
        action: "Check if the id is typed correctly.",
      });
    }

    return results.rows[0];
  }
}

async function update(id, producerInputValues) {
  const currentProducer = await findOneById(id);

  const producerWithNewValues = { ...currentProducer, ...producerInputValues };

  const updatedProducer = await runUpdateQuery(producerWithNewValues);
  return updatedProducer;

  async function runUpdateQuery(producerWithNewValues) {
    const results = await database.query({
      text: `
        UPDATE
          producers
        SET
          name = $1,
          location = $2,
          phone = $3,
          updated_at = timezone('utc', now())
        WHERE
          id = $4
        RETURNING
          *
        ;`,
      values: [
        producerWithNewValues.name,
        producerWithNewValues.location,
        producerWithNewValues.phone,
        producerWithNewValues.id,
      ],
    });

    return results.rows[0];
  }
}

async function deleteProducer(id) {
  await findOneById(id);

  await runDeleteQuery(id);

  async function runDeleteQuery(id) {
    await database.query({
      text: `
        DELETE FROM
          producers
        WHERE
          id = $1
        ;`,
      values: [id],
    });
  }
}

const user = {
  create,
  listAll,
  findOneById,
  update,
  deleteProducer,
};

export default user;
