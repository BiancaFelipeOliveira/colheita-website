import database from "infra/database";
import { ValidationError, NotFoundError } from "infra/errors";

async function create(productInputValues) {
  if (
    productInputValues.name === undefined ||
    productInputValues.category === undefined ||
    productInputValues.price === undefined ||
    productInputValues.description === undefined ||
    productInputValues.quantity === undefined ||
    productInputValues.producer_id === undefined
  ) {
    throw new ValidationError({
      message: "Some values are missing.",
      action:
        "You must provide values for name, category, price, description, quantity and producer_id.",
    });
  }

  const newProduct = await runInsertQuery({
    name: productInputValues.name,
    category: productInputValues.category,
    price: productInputValues.price,
    description: productInputValues.description,
    quantity: productInputValues.quantity,
    producer_id: productInputValues.producer_id,
  });
  return newProduct;

  async function runInsertQuery(productInputValues) {
    const results = await database.query({
      text: `
        INSERT INTO
          products (name, category, price, description, quantity, producer_id)
        VALUES
          ($1, $2, $3, $4, $5, $6)
        RETURNING
          *
        ;`,
      values: [
        productInputValues.name,
        productInputValues.category,
        productInputValues.price,
        productInputValues.description,
        productInputValues.quantity,
        productInputValues.producer_id,
      ],
    });

    return results.rows[0];
  }
}

async function listAll() {
  const productsFound = await runSelectQuery();

  return productsFound;

  async function runSelectQuery() {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          products
        ;`,
    });

    return results.rows;
  }
}

async function findOneById(id) {
  const productsFound = await runSelectQuery(id);

  return productsFound;

  async function runSelectQuery(id) {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          products
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

async function update(id, productInputValues) {
  const currentProduct = await findOneById(id);

  const productWithNewValues = { ...currentProduct, ...productInputValues };

  const updatedProduct = await runUpdateQuery(productWithNewValues);
  return updatedProduct;

  async function runUpdateQuery(productWithNewValues) {
    const results = await database.query({
      text: `
        UPDATE
          products
        SET
          name = $1,
          category = $2,
          price = $3,
          description = $4,
          quantity = $5,
          producer_id = $6,
          updated_at = timezone('utc', now())
        WHERE
          id = $7
        RETURNING
          *
        ;`,
      values: [
        productWithNewValues.name,
        productWithNewValues.category,
        productWithNewValues.price,
        productWithNewValues.description,
        productWithNewValues.quantity,
        productWithNewValues.producer_id,
        productWithNewValues.id,
      ],
    });

    return results.rows[0];
  }
}

async function deleteProduct(id) {
  await findOneById(id);

  await runDeleteQuery(id);

  async function runDeleteQuery(id) {
    await database.query({
      text: `
        DELETE FROM
          products
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
  deleteProduct,
};

export default user;
