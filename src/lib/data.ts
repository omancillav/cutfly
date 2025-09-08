import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

export const getLinks = async () => {
  const query = "SELECT * FROM links";
  const res = await turso.execute(query);
  return res.rows;
};

export const getLinksByUserId = async (userId: number) => {
  const query = "SELECT * FROM links WHERE user_id = ?";
  const res = await turso.execute(query, [userId]);
  return res.rows;
};
