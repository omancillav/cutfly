import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || "",
  authToken: process.env.TURSO_AUTH_TOKEN || "",
});

interface LinkData {
  url: string;
  userId: string;
  code: string;
  description: string;
  title: string;
}

export const createLink = async (data: LinkData) => {
  const res = await turso.execute("INSERT INTO links (user_id, url, code, description, title) VALUES (?, ?, ?, ?, ?)", [
    data.userId,
    data.url,
    data.code,
    data.description,
    data.title,
  ]);
  return res.rows[0];
};
