"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      // API call to follow user
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      size={"sm"}
      onClick={handleFollow}
      variant={"secondary"}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        <span>Follow</span>
      )}
    </Button>
  );
}
