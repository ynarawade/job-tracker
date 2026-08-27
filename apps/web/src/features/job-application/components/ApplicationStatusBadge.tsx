import { Badge } from "@/components/ui/badge";
import type { JobApplicationStatus } from "@repo/db";

type Props = {
  status: JobApplicationStatus | null;
};

const statusConfig: Record<
  JobApplicationStatus,
  {
    label: string;
    className?: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  APPLIED: {
    label: "Applied",
    variant: "secondary",
  },

  SCREENING: {
    label: "Screening",
    className:
      "bg-accent text-accent-foreground border-accent-foreground/20 hover:bg-accent/80",
  },

  INTERVIEW: {
    label: "Interview",
    className:
      "bg-accent text-accent-foreground border-accent-foreground/20 hover:bg-accent/80",
  },

  OFFER: {
    label: "Offer",
    className:
      "bg-primary/15 text-primary border-primary/25 hover:bg-primary/20",
  },

  REJECTED: {
    label: "Rejected",
    variant: "destructive",
    className:
      "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15",
  },

  GHOSTED: {
    label: "Ghosted",
    variant: "outline",
    className: "text-muted-foreground border-border/60",
  },
};

export function ApplicationStatusBadge({ status }: Props) {
  if (!status) {
    return (
      <Badge
        variant="outline"
        className="text-muted-foreground shadow-none font-normal text-xs py-0.5"
      >
        Not set
      </Badge>
    );
  }

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      className={`${config.className ?? ""} shadow-none font-medium text-xs py-0.5`}
    >
      {config.label}
    </Badge>
  );
}
