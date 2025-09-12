"use server";
import { turso } from "./turso-client";
import { auth } from "./auth-actions";
import { updateUserName, deleteUserAccount } from "./db-auth";
import { checkCodeExists, getLinksByUserId, isProtectedRoute } from "./data";

interface LinkData {
  url: string;
  code: string;
  description?: string | null;
}

type CreateLinkResult = { success: true; data: unknown } | { success: false; error: string; field?: string };

export const createLink = async (data: LinkData): Promise<CreateLinkResult> => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = Number(session.user.id);

    // Validar límite de 30 links por usuario
    const userLinks = await getLinksByUserId(userId);
    if (userLinks.length >= 30) {
      return { success: false, error: "Link limit reached. Maximum 30 links allowed per user." };
    }

    // Validar que el código no sea una ruta protegida
    if (isProtectedRoute(data.code)) {
      return { success: false, error: "Code already exists. Please choose a different short code.", field: "code" };
    }

    // Validar que el código no exista
    const codeExists = await checkCodeExists(data.code);
    if (codeExists) {
      return { success: false, error: "Code already exists. Please choose a different short code.", field: "code" };
    }

    const res = await turso.execute("INSERT INTO links (user_id, url, code, description) VALUES (?, ?, ?, ?)", [
      userId,
      data.url,
      data.code,
      data.description ?? null,
    ]);

    return { success: true, data: res.rows[0] };
  } catch (error) {
    console.error("Error creating link:", error);
    return { success: false, error: "Failed to create link in database" };
  }
};

export const updateLink = async (originalCode: string, data: LinkData): Promise<CreateLinkResult> => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = Number(session.user.id);

    // Si el código cambió, validar que el nuevo código no exista
    if (originalCode !== data.code) {
      // Validar que el código no sea una ruta protegida
      if (isProtectedRoute(data.code)) {
        return { success: false, error: "Code already exists. Please choose a different short code.", field: "code" };
      }

      const codeExists = await checkCodeExists(data.code);
      if (codeExists) {
        return { success: false, error: "Code already exists. Please choose a different short code.", field: "code" };
      }
    }

    // Actualizar el link
    const res = await turso.execute(
      "UPDATE links SET url = ?, code = ?, description = ? WHERE code = ? AND user_id = ?",
      [data.url, data.code, data.description ?? null, originalCode, userId]
    );

    if (res.rowsAffected === 0) {
      return { success: false, error: "Link not found or you don't have permission to edit it" };
    }

    return { success: true, data: res.rows[0] };
  } catch (error) {
    console.error("Error updating link:", error);
    return { success: false, error: "Failed to update link in database" };
  }
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

export const exportUserLinks = async () => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = Number(session.user.id);

    // Get all user links
    const userLinks = await getLinksByUserId(userId);

    // Format the data for export
    const exportData = {
      user: {
        name: session.user.name,
        email: session.user.email,
        exportDate: new Date().toISOString(),
      },
      links: userLinks.map((link) => ({
        url: String(link.url),
        code: String(link.code),
        description: link.description ? String(link.description) : null,
        clicks: Number(link.clicks),
        createdAt: String(link.created_at),
        shortUrl: `${
          process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
        }/${link.code}`,
      })),
      summary: {
        totalLinks: userLinks.length,
        totalClicks: userLinks.reduce((sum, link) => sum + Number(link.clicks), 0),
      },
    };

    return { success: true, data: exportData };
  } catch (error) {
    console.error("Error exporting user links:", error);
    return { success: false, error: "Failed to export links" };
  }
};

// Server action para actualizar el nombre del usuario
export const updateUserNameAction = async (newName: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { success: false, error: "Not authenticated" };
    }

    // Obtener el github_id desde la base de datos usando el user_id
    const result = await turso.execute(`SELECT github_id FROM users WHERE id = ?`, [session.user.id]);

    if (result.rows.length === 0) {
      return { success: false, error: "User not found" };
    }

    const githubId = String(result.rows[0].github_id);
    const updateResult = await updateUserName(githubId, newName.trim());

    if (updateResult) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to update name" };
    }
  } catch (error) {
    console.error("Error updating user name:", error);
    return { success: false, error: "Failed to update name" };
  }
};

// Server action para eliminar la cuenta del usuario
export const deleteUserAccountAction = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return { success: false, error: "Not authenticated" };
    }

    // Obtener el github_id desde la base de datos usando el user_id
    const result = await turso.execute(`SELECT github_id FROM users WHERE id = ?`, [session.user.id]);

    if (result.rows.length === 0) {
      return { success: false, error: "User not found" };
    }

    const githubId = String(result.rows[0].github_id);
    const deleteResult = await deleteUserAccount(githubId);

    if (deleteResult) {
      return { success: true };
    } else {
      return { success: false, error: "Failed to delete account" };
    }
  } catch (error) {
    console.error("Error deleting user account:", error);
    return { success: false, error: "Failed to delete account" };
  }
};
