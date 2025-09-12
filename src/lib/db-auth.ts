import { turso } from "@/lib/turso-client";

// Funciones de base de datos para autenticación
export async function createOrVerifyUser(githubId: string, username: string, email: string, name: string) {
  try {
    // Verificar si el usuario ya existe por github_id
    const existingUser = await turso.execute(`SELECT id FROM users WHERE github_id = ?`, [githubId]);

    if (existingUser.rows.length === 0) {
      // Usuario no existe, crear uno nuevo
      await turso.execute(
        `INSERT INTO users (github_id, username, email, name, created_at) 
         VALUES (?, ?, ?, ?, datetime('now'))`,
        [githubId, username, email, name]
      );
    }
    return true;
  } catch (error) {
    console.error("Error al crear/verificar usuario:", error);
    return false;
  }
}

export async function getUserIdByGithubId(githubId: string) {
  try {
    const result = await turso.execute(`SELECT id FROM users WHERE github_id = ?`, [githubId]);
    return result.rows.length > 0 ? String(result.rows[0].id) : null;
  } catch (error) {
    console.error("Error al obtener ID de usuario:", error);
    return null;
  }
}

export async function getUserByGithubId(githubId: string) {
  try {
    const result = await turso.execute(`SELECT id, github_id, username, email, name FROM users WHERE github_id = ?`, [
      githubId,
    ]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
}

export async function updateUserName(githubId: string, newName: string) {
  try {
    const result = await turso.execute(`UPDATE users SET name = ? WHERE github_id = ?`, [newName, githubId]);
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al actualizar nombre de usuario:", error);
    return false;
  }
}

export async function deleteUserAccount(githubId: string) {
  try {
    const result = await turso.execute(`DELETE FROM users WHERE github_id = ?`, [githubId]);
    return result.rowsAffected > 0;
  } catch (error) {
    console.error("Error al eliminar cuenta de usuario:", error);
    return false;
  }
}
