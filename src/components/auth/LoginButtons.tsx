"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { GitHubIcon } from "@/assets/github-icon";
import { GoogleIcon } from "@/assets/google-icon";
import { Loader } from "lucide-react";

export default function LoginButtons() {
  const [GoogleLoading, setGoogleLoading] = useState(false);
  const [GitHubLoading, setGitHubLoading] = useState(false);

  const handleClick = async (provider: "google" | "github") => {
    if (provider === "google") {
      setGoogleLoading(true);
    } else {
      setGitHubLoading(true);
    }
    try {
      await signIn(provider);
    } catch (error) {
      console.error(`Error during ${provider} sign-in:`, error);
      setGitHubLoading(false);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <Button
        type="submit"
        className="w-full py-4.5 md:py-4"
        variant="outline"
        onClick={() => handleClick("google")}
        disabled={GoogleLoading || GitHubLoading}
      >
        {GoogleLoading ? <Loader className="animate-spin" /> : <GoogleIcon />}
        <span>Continue with Google</span>
      </Button>
      <RainbowButton
        type="submit"
        className="w-full rounded-lg py-4.5 md:py-4"
        onClick={() => handleClick("github")}
        disabled={GoogleLoading || GitHubLoading}
      >
        {GitHubLoading ? <Loader className="animate-spin" /> : <GitHubIcon />}
        Continue with GitHub
      </RainbowButton>
    </div>
  );
}
