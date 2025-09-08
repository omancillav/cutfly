import type { Adapter } from "next-auth/adapters"
import { createClient } from '@libsql/client'

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

export function createTursoAdapter(): Adapter {
  return {
    async createUser(user) {
      const result = await db.execute(
        `INSERT INTO users (github_id, username, email, name, created_at) 
         VALUES (?, ?, ?, ?, datetime('now')) 
         RETURNING id, github_id, username, email, name, created_at`,
        [0, String(user.name || ''), String(user.email || ''), String(user.name || '')]
      )

      const newUser = result.rows[0]
      return {
        id: String(newUser.id),
        name: String(newUser.name),
        email: String(newUser.email),
        image: user.image,
        emailVerified: null
      }
    },

    async getUser(id) {
      const result = await db.execute(
        `SELECT id, github_id, username, email, name FROM users WHERE id = ?`,
        [id]
      )

      if (result.rows.length === 0) return null

      const user = result.rows[0]
      return {
        id: String(user.id),
        name: String(user.name),
        email: String(user.email),
        image: null,
        emailVerified: null
      }
    },

    async getUserByEmail(email) {
      const result = await db.execute(
        `SELECT id, github_id, username, email, name FROM users WHERE email = ?`,
        [email]
      )

      if (result.rows.length === 0) return null

      const user = result.rows[0]
      return {
        id: String(user.id),
        name: String(user.name),
        email: String(user.email),
        image: null,
        emailVerified: null
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      if (provider !== 'github') return null

      const result = await db.execute(
        `SELECT id, github_id, username, email, name FROM users WHERE github_id = ?`,
        [providerAccountId]
      )

      if (result.rows.length === 0) return null

      const user = result.rows[0]
      return {
        id: String(user.id),
        name: String(user.name),
        email: String(user.email),
        image: null,
        emailVerified: null
      }
    },

    async updateUser(user) {
      const result = await db.execute(
        `UPDATE users SET name = ?, email = ? WHERE id = ? 
         RETURNING id, github_id, username, email, name`,
        [String(user.name || ''), String(user.email || ''), user.id]
      )

      if (result.rows.length === 0) throw new Error("User not found")

      const updatedUser = result.rows[0]
      return {
        id: String(updatedUser.id),
        name: String(updatedUser.name),
        email: String(updatedUser.email),
        image: user.image,
        emailVerified: null
      }
    },

    async deleteUser(userId) {
      await db.execute(
        `DELETE FROM users WHERE id = ?`,
        [userId]
      )
    },

    async linkAccount(account) {
      // Para GitHub, actualizamos el github_id del usuario
      if (account.provider === 'github') {
        await db.execute(
          `UPDATE users SET github_id = ? WHERE id = ?`,
          [String(account.providerAccountId), String(account.userId)]
        )
      }
      return account
    },

    async unlinkAccount({ providerAccountId, provider }) {
      if (provider === 'github') {
        await db.execute(
          `UPDATE users SET github_id = NULL WHERE github_id = ?`,
          [String(providerAccountId)]
        )
      }
    },

    async createVerificationToken({ identifier, expires, token }) {
      return { identifier, expires, token }
    },

    async useVerificationToken() {
      return null
    },
  }
}
