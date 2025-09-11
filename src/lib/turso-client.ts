import { createClient } from "@libsql/client";

// Función para obtener el cliente de Turso
export function getTursoClient() {
  const databaseUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!databaseUrl) {
    throw new Error("TURSO_DATABASE_URL environment variable is required. Make sure your .env.local file is configured.");
  }

  if (!authToken) {
    throw new Error("TURSO_AUTH_TOKEN environment variable is required. Make sure your .env.local file is configured.");
  }

  return createClient({
    url: databaseUrl,
    authToken: authToken,
  });
}

// Cliente singleton de Turso (lazy initialization)
let tursoClient: ReturnType<typeof createClient> | null = null;

export function getTurso() {
  if (!tursoClient) {
    tursoClient = getTursoClient();
    console.log('Turso database connected successfully');
  }
  return tursoClient;
}

// Exportar el cliente para compatibilidad hacia atrás
export const turso = getTurso();
