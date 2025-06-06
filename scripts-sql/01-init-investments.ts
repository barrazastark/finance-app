import sql from "../src/lib/db";

async function createTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS institutions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS investments (
      id SERIAL PRIMARY KEY,
      initial_amount NUMERIC NOT NULL,
      start_date DATE NOT NULL,
      term INTEGER NOT NULL,
      rate REAL NOT NULL,
      payment_frequency TEXT CHECK (payment_frequency IN ('diaria', 'semanal', 'mensual', 'anual')) NOT NULL,
      institution_id INTEGER REFERENCES institutions(id),
      type TEXT CHECK (type IN ('vista', 'corto', 'mediano', 'largo')) NOT NULL
    );
  `;

  const institutions = [
    "CETES", "Finsus", "Stori",
  ];

  for (const name of institutions) {
    await sql`
      INSERT INTO institutions (name)
      VALUES (${name})
      ON CONFLICT (name) DO NOTHING;
    `;
  }

  console.log('Tablas creadas correctamente');
}

createTables().catch(console.error);
