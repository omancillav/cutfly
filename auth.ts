import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { createTursoAdapter } from "@/lib/turso-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })
  ],
  adapter: createTursoAdapter(),
  callbacks: {
    async signIn() {
      // El adaptador se encargará de crear/actualizar el usuario
      return true
    },
    async session({ session, token }) {
      // Con JWT, el user info viene del token
      if (session?.user && token?.uid) {
        session.user.id = String(token.uid)
      }
      return session
    },
    async jwt({ user, token }) {
      if (user) {
        token.uid = user.id
      }
      return token
    }
  },
  session: {
    strategy: "jwt", // Cambiado a JWT para simplicidad
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  pages: {
    signIn: '/login',
  },
})
