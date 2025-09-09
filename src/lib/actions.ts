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
  try {
    const res = await turso.execute("DELETE FROM links WHERE code = ?", [code]);

    if (res.rowsAffected === 0) {
      throw new Error("Link not found");
    }

    return { success: true, message: "Link deleted successfully" };
  } catch (error) {
    console.error("Error in deleteLink:", error);
    throw new Error("Failed to delete link");
  }
};

export const incrementClicks = async (code: string) => {
  try {
    await turso.execute("UPDATE links SET clicks = clicks + 1 WHERE code = ?", [code]);
    return { success: true, message: "Link clicks incremented successfully" };
  } catch (error) {
    console.error("Error in incrementClicks:", error);
    throw new Error("Failed to increment link clicks");
  }
};
