"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="text-center space-y-3">
        <h2 className="text-lg font-semibold">Something went wrong</h2>

        <p className="text-sm text-muted-foreground">
          We couldn't load your applications.
        </p>

        <Button onClick={() => reset()} size="sm">
          Try again
        </Button>
      </div>
    </div>
  );
}
