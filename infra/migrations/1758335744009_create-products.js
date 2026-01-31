exports.up = (pgm) => {
  pgm.createTable("products", {
    id: {
      type: "serial",
      primaryKey: true,
    },

    name: {
      type: "varchar(60)",
      notNull: true,
    },

    category: {
      type: "varchar(50)",
      notNull: true,
    },

    price: {
      type: "numeric(10, 2)",
      notNull: true,
    },

    description: {
      type: "text",
      notNull: true,
    },

    quantity: {
      type: "integer",
      notNull: true,
    },

    producer_id: {
      type: "integer",
      notNull: true,
      references: '"producers"',
      onDelete: "cascade",
    },

    // Why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },

    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });
};

exports.down = false;
