exports.up = (pgm) => {
  pgm.createTable("producers", {
    id: {
      type: "serial",
      primaryKey: true,
    },

    name: {
      type: "varchar(60)",
      notNull: true,
    },

    location: {
      type: "varchar(100)",
      notNull: true,
    },

    phone: {
      type: "varchar(20)",
      notNull: true,
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
