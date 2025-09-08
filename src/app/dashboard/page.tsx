import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] mx-w-[1440px] px-3 md:px-6 flex-col gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <Link href="/" passHref className="mt-2 md:mt-4">
        <Button className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Home
        </Button>
      </Link>
    </div>
  );
}
