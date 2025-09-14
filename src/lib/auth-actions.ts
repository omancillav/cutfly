"use server";
import { signIn as authSignIn, signOut as authSignOut, auth } from "@/auth";

export { auth };

export async function signIn(provider: "github" | "google") {
  await authSignIn(provider, { redirectTo: "/dashboard" });
}

export async function signOut() {
  await authSignOut({ redirectTo: "/" });
}
