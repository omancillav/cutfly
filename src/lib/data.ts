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
