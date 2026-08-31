"use client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateApplicationStatus } from "@/features/job-application/actions/updateApplication.action";
import { cn } from "@/lib/utils";
import type { JobApplicationStatus } from "@repo/db";
import { ChevronDownIcon, Loader2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const STATUS_CONFIG: Record<
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

const STATUS_KEYS = Object.keys(STATUS_CONFIG) as JobApplicationStatus[];

type Props = {
  applicationId: string;
  status: JobApplicationStatus | null;
  onUpdated?: (newStatus: JobApplicationStatus) => void;
  disabled?: boolean;
};

export function ApplicationStatusSelect({
  applicationId,
  status,
  onUpdated,
  disabled = false,
}: Props) {
  const [localStatus, setLocalStatus] = useState<JobApplicationStatus | null>(
    status
  );
  const [isPending, startTransition] = useTransition();

  function handleSelect(newStatus: JobApplicationStatus) {
    if (newStatus === localStatus) return;

    const previousStatus = localStatus;
    setLocalStatus(newStatus); // Optimistic update
    onUpdated?.(newStatus);

    startTransition(async () => {
      const response = await updateApplicationStatus(applicationId, newStatus);
      if (response.statusCode >= 400) {
        setLocalStatus(previousStatus);
        if (previousStatus) onUpdated?.(previousStatus);
        toast.error(response.message || "Failed to update status");
      }
    });
  }

  const currentConfig = localStatus ? STATUS_CONFIG[localStatus] : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled || isPending}
        className="focus:outline-none group rounded-md"
      >
        <Badge
          variant={currentConfig?.variant}
          className={cn(
            "shadow-none font-medium text-xs py-0.5 px-2 inline-flex items-center gap-1 cursor-pointer transition-all border",
            currentConfig?.className ?? "",
            !localStatus &&
              "text-muted-foreground border-border/60 font-normal",
            isPending && "opacity-70"
          )}
        >
          {isPending ? (
            <Loader2Icon className="h-3 w-3 animate-spin" />
          ) : (
            (currentConfig?.label ?? "Not set")
          )}
          <ChevronDownIcon className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-36 min-w-36 p-1">
        {STATUS_KEYS.map((key) => {
          const cfg = STATUS_CONFIG[key];
          const isSelected = key === localStatus;

          return (
            <DropdownMenuItem
              key={key}
              onClick={() => handleSelect(key)}
              className="flex items-center justify-between text-xs cursor-pointer py-1.5 px-2"
            >
              <Badge
                variant={cfg.variant}
                className={cn(
                  "shadow-none font-medium text-[11px] py-0 px-1.5 pointer-events-none border",
                  cfg.className ?? ""
                )}
              >
                {cfg.label}
              </Badge>
              {isSelected && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
