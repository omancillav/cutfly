"use server";

import { turso } from "./turso-client";

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

export const deleteLink = async (code: string) => {
  const res = await turso.execute("DELETE FROM links WHERE code = ?", [code]);
  return res;
};
