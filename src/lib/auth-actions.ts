import { signIn as authSignIn, signOut as authSignOut, auth } from "@/auth"

export { auth }

export async function signIn() {
  await authSignIn("github", { redirectTo: "/dashboard" })
}

export async function signOut() {
  await authSignOut({ redirectTo: "/" })
}
