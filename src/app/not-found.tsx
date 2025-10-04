import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6 md:gap-8 px-2 min-h-[calc(100vh-200px)]">
        {/* 404 Number */}
        <div
          className="text-8xl md:text-9xl font-bold text-primary/20 animate-in fade-in slide-in-from-top-6 duration-1000 ease-out"
          style={{
            animationFillMode: "both",
          }}
        >
          404
        </div>

        {/* Title */}
        <h1
          className="text-4xl font-bold text-center animate-in fade-in slide-in-from-top-6 duration-1000 ease-out delay-150"
          style={{
            animationFillMode: "both",
          }}
        >
          Page Not Found
        </h1>

        {/* Description */}
        <p
          className="text-center max-w-2xl text-[15px text-muted-foreground animate-in fade-in zoom-in-95 duration-700 ease-out delay-300"
          style={{
            animationFillMode: "both",
          }}
        >
          The page you're looking for doesn't exist or has been moved. The link might be broken or the short code may
          not be valid.
        </p>

        {/* Action buttons */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out delay-450"
          style={{
            animationFillMode: "both",
          }}
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="default" className="w-full sm:w-auto p-5 transition-all duration-300">
              <Home className="size-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto p-5 border bg-background transition-all duration-300">
              <ArrowLeft className="size-5" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
