import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto w-full p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-36" />
      </div>

      <div className="flex items-center space-x-6 rounded-lg border bg-card px-4 py-3 w-fit">
        <div className="space-y-2">
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-3 w-14" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-3 w-16" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-72" />
          <Skeleton className="h-9 w-24" />
        </div>

        <div className="rounded-lg border overflow-hidden">
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
