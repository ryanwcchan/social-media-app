import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Homepage Content</h1>
    </div>
  );
}
