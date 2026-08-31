import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function ApplicationDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10 animate-pulse">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* --- 1. Header Skeleton --- */}
        <div className="space-y-4 border-b border-border pb-6">
          {/* Top Action Bar */}
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Skeleton className="h-8 w-36 rounded-md" />

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-32 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>

          {/* Title & Status Row */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {/* Job Title */}
              <Skeleton className="h-8 w-64 md:w-80 rounded-md" />
              {/* Status Select Badge */}
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            {/* Sub-meta details bar (Company, Platform, Location, Salary) */}
            <div className="flex items-center gap-2 pt-1">
              <Skeleton className="h-4 w-28 rounded-xs" />
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-xs" />
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-4 w-36 rounded-xs" />
            </div>
          </div>
        </div>

        {/* --- 2. Main 2-Column Grid Skeleton --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Tech Stack + Job Description */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tech Stack & Keywords */}
            <div className="space-y-2.5">
              <Skeleton className="h-3.5 w-36 rounded-xs" />
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
                <Skeleton className="h-5 w-14 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-5 w-18 rounded-md" />
              </div>
            </div>

            <Separator />

            {/* Job Description Text Box */}
            <div className="space-y-2.5">
              <Skeleton className="h-3.5 w-32 rounded-xs" />
              <div className="rounded-lg border border-border bg-card p-4 space-y-3 min-h-[360px]">
                <Skeleton className="h-4 w-3/4 rounded-xs" />
                <Skeleton className="h-4 w-full rounded-xs" />
                <Skeleton className="h-4 w-5/6 rounded-xs" />
                <Skeleton className="h-4 w-2/3 rounded-xs" />
                <div className="pt-4 space-y-2.5">
                  <Skeleton className="h-4 w-full rounded-xs" />
                  <Skeleton className="h-4 w-11/12 rounded-xs" />
                  <Skeleton className="h-4 w-4/5 rounded-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Cadence Card + Metadata Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Follow-up / Cadence Automation Skeleton */}
            <Card className="border border-border shadow-xs">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-32 rounded-xs" />
                    <Skeleton className="h-3 w-28 rounded-xs" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-md" />
                </div>
              </CardHeader>
              <CardContent className="pt-5 space-y-5">
                {/* Contact Banner */}
                <Skeleton className="h-12 w-full rounded-md" />

                {/* Timeline Nodes */}
                <div className="space-y-4 pt-1">
                  <Skeleton className="h-3.5 w-28 rounded-xs" />
                  <div className="space-y-3 pl-2">
                    <div className="flex gap-3 items-center">
                      <Skeleton className="h-3 w-3 rounded-full shrink-0" />
                      <Skeleton className="h-3.5 w-full rounded-xs" />
                    </div>
                    <div className="flex gap-3 items-center">
                      <Skeleton className="h-3 w-3 rounded-full shrink-0" />
                      <Skeleton className="h-3.5 w-4/5 rounded-xs" />
                    </div>
                  </div>
                </div>

                {/* Send Button */}
                <Skeleton className="h-9 w-full rounded-md" />
              </CardContent>
            </Card>

            {/* Metadata Card Skeleton */}
            <Card className="border border-border/70 shadow-xs">
              <CardContent className="pt-4 space-y-3.5">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3.5 w-24 rounded-xs" />
                  <Skeleton className="h-3.5 w-20 rounded-xs" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3.5 w-24 rounded-xs" />
                  <Skeleton className="h-3.5 w-32 rounded-xs" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3.5 w-24 rounded-xs" />
                  <Skeleton className="h-3.5 w-24 rounded-xs" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3.5 w-24 rounded-xs" />
                  <Skeleton className="h-3.5 w-24 rounded-xs" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
