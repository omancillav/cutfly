import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createOrVerifyUser, getUserIdByGithubId, getUserByGithubId } from "@/lib/db-auth";

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
        return await createOrVerifyUser(
          String(account.providerAccountId),
          String(profile.login || profile.name || ""),
          String(user.email || ""),
          String(user.name || "")
        );
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "github" && profile) {
        // Obtener el ID del usuario de la base de datos
        const userId = await getUserIdByGithubId(String(account.providerAccountId));

        if (userId) {
          token.uid = userId;
          token.github_id = String(account.providerAccountId);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.uid && token?.github_id) {
        session.user.id = String(token.uid);

        // Obtener información actualizada del usuario desde la base de datos
        const userData = await getUserByGithubId(String(token.github_id));
        if (userData) {
          session.user.name = String(userData.name);
          session.user.email = String(userData.email);
        }
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
