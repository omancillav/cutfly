import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { turso } from "@/lib/turso-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && profile) {
        try {
          // Verificar si el usuario ya existe por github_id
          const existingUser = await turso.execute(`SELECT id FROM users WHERE github_id = ?`, [
            String(account.providerAccountId),
          ]);

          if (existingUser.rows.length === 0) {
            // Usuario no existe, crear uno nuevo
            await turso.execute(
              `INSERT INTO users (github_id, username, email, name, created_at) 
               VALUES (?, ?, ?, ?, datetime('now'))`,
              [
                String(account.providerAccountId),
                String(profile.login || profile.name || ""),
                String(user.email || ""),
                String(user.name || ""),
              ]
            );
          }
          return true;
        } catch (error) {
          console.error("Error al crear/verificar usuario:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "github" && profile) {
        // Obtener el ID del usuario de la base de datos
        const result = await turso.execute(`SELECT id FROM users WHERE github_id = ?`, [
          String(account.providerAccountId),
        ]);

        if (result.rows.length > 0) {
          token.uid = String(result.rows[0].id);
          token.github_id = String(account.providerAccountId);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.uid) {
        session.user.id = String(token.uid);
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  pages: {
    signIn: "/login",
  },
});
