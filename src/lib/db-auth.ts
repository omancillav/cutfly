import { turso } from "@/lib/turso-client";

interface CreateOrUpdateUserParams {
  email: string;
  name?: string | null;
  image?: string | null;
  provider: string;
  providerAccountId: string;
}

export async function createOrUpdateUser({
  email,
  name,
  image,
  provider,
  providerAccountId,
}: CreateOrUpdateUserParams): Promise<boolean> {
  try {
    const existingUserResult = await turso.execute({
      sql: "SELECT * FROM users WHERE email = ?",
      args: [email],
    });

    const providerIdColumn = `${provider}_id`;

    if (existingUserResult.rows.length > 0) {
      const user = existingUserResult.rows[0];
      if (!user[providerIdColumn]) {
        await turso.execute(`UPDATE users SET ${providerIdColumn} = ?, name = ?, image = ? WHERE email = ?`, [
          providerAccountId,
          name ?? user.name,
          image ?? user.image,
          email,
        ]);
      }
    } else {
      // El usuario no existe, crear uno nuevo
      await turso.execute(
        `INSERT INTO users (email, name, image, ${providerIdColumn}, created_at) 
              VALUES (?, ?, ?, ?, datetime('now'))`,
        [email, name ?? null, image ?? null, providerAccountId]
      );
    }
    return true;
  } catch (error) {
    console.error("Error al crear o actualizar usuario:", error);
    return false;
  }
}

export async function getUserIdByEmail(email: string): Promise<string | null> {
  try {
    const result = await turso.execute({
      sql: "SELECT id FROM users WHERE email = ?",
      args: [email],
    });
    return result.rows.length > 0 ? String(result.rows[0].id) : null;
  } catch (error) {
    console.error("Error al obtener ID de usuario por email:", error);
    return null;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const result = await turso.execute({
      sql: "SELECT id, name, email, image, github_id, google_id FROM users WHERE email = ?",
      args: [email],
    });
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error al obtener usuario por email:", error);
    return null;
  }
}

export async function updateUserName(userId: string, newName: string): Promise<boolean> {
  try {
    const result = await turso.execute({
      sql: "UPDATE users SET name = ? WHERE id = ?",
      args: [newName, userId],
    });
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al actualizar nombre de usuario:", error);
    return false;
  }
}

export async function deleteUserAccount(userId: string): Promise<boolean> {
  try {
    const result = await turso.execute({
      sql: "DELETE FROM users WHERE id = ?",
      args: [userId],
    });
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al eliminar cuenta de usuario:", error);
    return false;
  }
}
