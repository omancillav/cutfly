import { turso } from "./turso-client";

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

export const getLinkByCode = async (code: string) => {
  const query = "SELECT * FROM links WHERE code = ?";
  const res = await turso.execute(query, [code]);
  return res.rows[0];
};

export const checkCodeExists = async (code: string): Promise<boolean> => {
  const query = "SELECT 1 FROM links WHERE code = ? LIMIT 1";
  const res = await turso.execute(query, [code]);
  return res.rows.length > 0;
};

const PROTECTED_ROUTES = ["dashboard", "login", "api"];

export const isProtectedRoute = (code: string): boolean => {
  return PROTECTED_ROUTES.includes(code.toLowerCase());
};
