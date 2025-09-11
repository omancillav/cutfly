"use server";
import { turso } from "./turso-client";
import { auth } from "./auth-actions";

interface LinkData {
  url: string;
  code: string;
  description?: string | null;
}

export const createLink = async (data: LinkData) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;

  const res = await turso.execute("INSERT INTO links (user_id, url, code, description) VALUES (?, ?, ?, ?)", [
    userId,
    data.url,
    data.code,
    data.description ?? null,
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
