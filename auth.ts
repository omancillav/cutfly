import NextAuth, { DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { createOrUpdateUser, getUserIdByEmail, getUserByEmail } from "@/lib/db-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        console.error("Email not provided by the authentication provider.");
        return false;
      }

      if (account?.provider === "github" || account?.provider === "google") {
        return await createOrUpdateUser({
          email: user.email,
          name: user.name,
          image: user.image,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });
      }

      return false;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const userId = await getUserIdByEmail(user.email);
        if (userId) {
          token.uid = userId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) {
        session.user.id = token.uid as string;
        
        // Obtener los datos más recientes del usuario de la base de datos
        if (session.user.email) {
          const userData = await getUserByEmail(session.user.email);
          if (userData) {
            session.user.name = userData.name ? String(userData.name) : null;
            session.user.image = userData.image ? String(userData.image) : null;
          }
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
