import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";

function Dashboard() {
  return (
    <div className="flex flex-col space-y-6">
      {/* Page Title & Core Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold font-heading tracking-tight text-foreground">
          Applications
        </h1>
        <Button className="gap-2 shadow-xs h-10">
          <PlusIcon className="h-4 w-4" />
          Add application
        </Button>
      </div>

      {/* Metrics Bar */}
      <div className="flex items-center space-x-6 rounded-lg border bg-card p-4 text-card-foreground shadow-xs w-fit">
        <div className="flex flex-col">
          <span className="text-2xl font-bold font-mono text-foreground leading-none">
            24
          </span>
          <span className="text-xs text-muted-foreground mt-1 font-medium">
            Active
          </span>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex flex-col">
          <span className="text-2xl font-bold font-mono text-primary leading-none">
            7
          </span>
          <span className="text-xs text-muted-foreground mt-1 font-medium">
            Follow-ups
          </span>
        </div>

        <Separator orientation="vertical" className="h-8" />

        <div className="flex flex-col">
          <span className="text-2xl font-bold font-mono text-foreground leading-none">
            3
          </span>
          <span className="text-xs text-muted-foreground mt-1 font-medium">
            Offers
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
