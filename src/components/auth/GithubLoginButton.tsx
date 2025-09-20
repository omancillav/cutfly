"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { GitHubIcon } from "@/assets/github-icon";
import { Loader } from "lucide-react";

export function GitHubLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await signIn("github");
    } catch (error) {
      console.error("Error during GitHub sign-in:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RainbowButton type="submit" className="w-full rounded-lg py-4.5 md:py-4" onClick={handleClick} disabled={loading}>
      {loading ? <Loader className="animate-spin" /> : <GitHubIcon />}
      Continue with GitHub
    </RainbowButton>
  );
}
