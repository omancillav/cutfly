"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/assets/google-icon";
import { Loader } from "lucide-react";

export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setLoading(false);
    }
  };

  return (
    <Button type="submit" className="w-full py-4.5 md:py-4" variant="outline" onClick={handleClick} disabled={loading}>
      {loading ? <Loader className="animate-spin" /> : <GoogleIcon />}
      <span>Continue with Google</span>
    </Button>
  );
}
