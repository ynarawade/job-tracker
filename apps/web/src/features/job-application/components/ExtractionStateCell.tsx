import { Badge } from "@/components/ui/badge";
import type { JobApplicationExtractionStatus } from "@repo/db";
import { Loader2Icon } from "lucide-react";

type Props = {
  state: JobApplicationExtractionStatus;
};

export function ExtractionStateCell({ state }: Props) {
  switch (state) {
    case "PENDING":
      return (
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
          Extracting...
        </span>
      );

    case "FAILED":
      return (
        <Badge
          variant="destructive"
          className="text-xs bg-destructive/10 text-destructive border-destructive/20 shadow-none"
        >
          Extraction failed
        </Badge>
      );

    case "COMPLETED":
      return null;
  }
}
