import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
});

export const getUsers = async () => {
  const res = await turso.execute("SELECT * FROM users");
  return res.rows;
}