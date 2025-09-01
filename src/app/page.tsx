import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center bg-color-background min-h-screen">
      <h1>Welcome to CutFly</h1>
      <Button variant="default">Get Started</Button>
      <p>Your one-stop solution for all your cutting needs.</p>
    </div>
  );
}
