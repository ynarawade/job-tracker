import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ExternalLinkIcon,
  MailIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react";
import AddApplicationDialog from "./_dialog";

type JobApplicationStatus =
  | "SAVED"
  | "APPLIED"
  | "INTERVIEWING"
  | "OFFER"
  | "REJECTED";

type JobLocationType = "REMOTE" | "HYBRID" | "ON_SITE";
type JobSlaryCurrencyType = "USD" | "EUR" | "GBP" | "INR";

interface DummyJobApplication {
  id: string;
  user_id: string;
  job_title: string;
  job_url: string;
  company: string;
  jd_text: string;
  jd_formatted: string;
  contact_mail?: string;
  location?: string;
  location_type?: JobLocationType;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: JobSlaryCurrencyType;
  skills: string[];
  status: JobApplicationStatus;
  platform: string;
  followup_freq_override?: number;
  created_at: string;
  updated_at: string;
}

const mockApplications: DummyJobApplication[] = [
  {
    id: "app-1",
    user_id: "usr-1",
    job_title: "Senior Full Stack Engineer",
    company: "Razorpay",
    job_url: "https://razorpay.com/careers",
    jd_text: "Building high-performance payment gateways...",
    jd_formatted: "Building high-performance payment gateways...",
    contact_mail: "tech-hiring@razorpay.com",
    location: "Bengaluru",
    location_type: "HYBRID",
    salary_min: 3200000,
    salary_max: 4500000,
    salary_currency: "INR",
    skills: ["React", "Node.js", "Go", "AWS"],
    status: "INTERVIEWING",
    platform: "LinkedIn",
    created_at: "2026-08-14T10:30:00Z",
    updated_at: "2026-08-18T14:20:00Z",
  },
  {
    id: "app-2",
    user_id: "usr-1",
    job_title: "Product Engineer",
    company: "Postman",
    job_url: "https://postman.com/careers",
    jd_text: "Crafting API development ecosystem tooling...",
    jd_formatted: "Crafting API development ecosystem tooling...",
    contact_mail: "careers@postman.com",
    location: "Remote (India)",
    location_type: "REMOTE",
    salary_min: 2800000,
    salary_max: 3800000,
    salary_currency: "INR",
    skills: ["TypeScript", "Electron", "React", "GraphQL"],
    status: "OFFER",
    platform: "Company Site",
    created_at: "2026-08-02T11:00:00Z",
    updated_at: "2026-08-19T09:45:00Z",
  },
  {
    id: "app-3",
    user_id: "usr-1",
    job_title: "Senior Frontend Engineer",
    company: "Stripe",
    job_url: "https://stripe.com/jobs",
    jd_text: "Building core financial components...",
    jd_formatted: "Building core financial components...",
    contact_mail: "recruiter@stripe.com",
    location: "San Francisco, CA",
    location_type: "REMOTE",
    salary_min: 160000,
    salary_max: 195000,
    salary_currency: "USD",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    status: "APPLIED",
    platform: "Wellfound",
    created_at: "2026-08-15T08:15:00Z",
    updated_at: "2026-08-15T08:15:00Z",
  },
  {
    id: "app-4",
    user_id: "usr-1",
    job_title: "UI Engineer",
    company: "Zomato",
    job_url: "https://zomato.com/careers",
    jd_text: "Building consumer-facing web apps...",
    jd_formatted: "Building consumer-facing web apps...",
    location: "Gurugram",
    location_type: "ON_SITE",
    salary_min: 2200000,
    salary_max: 3000000,
    salary_currency: "INR",
    skills: ["Next.js", "Tailwind CSS"],
    status: "SAVED",
    platform: "Naukri",
    created_at: "2026-08-19T16:00:00Z",
    updated_at: "2026-08-19T16:00:00Z",
  },
  {
    id: "app-5",
    user_id: "usr-1",
    job_title: "Staff Software Engineer",
    company: "Datadog",
    job_url: "https://datadog.com/careers",
    jd_text: "Scale distributed telemetry pipelines...",
    jd_formatted: "Scale distributed telemetry pipelines...",
    contact_mail: "jobs@datadog.com",
    location: "London",
    location_type: "HYBRID",
    salary_min: 90000,
    salary_max: 120000,
    salary_currency: "GBP",
    skills: ["Go", "Kubernetes", "Distributed Systems"],
    status: "REJECTED",
    platform: "LinkedIn",
    created_at: "2026-07-10T09:00:00Z",
    updated_at: "2026-08-01T12:30:00Z",
  },
];

function getStatusBadge(status: JobApplicationStatus) {
  switch (status) {
    case "OFFER":
      return (
        <Badge className="bg-primary/15 text-primary border-primary/25 hover:bg-primary/20 shadow-none font-medium text-xs py-0.5">
          Offer
        </Badge>
      );
    case "INTERVIEWING":
      return (
        <Badge className="bg-accent text-accent-foreground border-accent-foreground/20 hover:bg-accent/80 shadow-none font-medium text-xs py-0.5">
          Interviewing
        </Badge>
      );
    case "APPLIED":
      return (
        <Badge
          variant="secondary"
          className="font-normal shadow-none text-xs py-0.5"
        >
          Applied
        </Badge>
      );
    case "SAVED":
      return (
        <Badge
          variant="outline"
          className="text-muted-foreground shadow-none font-normal text-xs py-0.5"
        >
          Saved
        </Badge>
      );
    case "REJECTED":
      return (
        <Badge
          variant="destructive"
          className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15 shadow-none font-normal text-xs py-0.5"
        >
          Rejected
        </Badge>
      );
  }
}

function formatSalary(
  min?: number,
  max?: number,
  currency: JobSlaryCurrencyType = "USD"
) {
  if (!min && !max) return "—";

  if (currency === "INR") {
    const formatLakhs = (num: number) =>
      `${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 1)}L`;
    if (min && max) return `₹${formatLakhs(min)} - ₹${formatLakhs(max)} LPA`;
    if (min) return `₹${formatLakhs(min)}+ LPA`;
    return `Up to ₹${formatLakhs(max!)} LPA`;
  }

  const symbolMap: Record<string, string> = { USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbolMap[currency] || "$";
  const formatK = (num: number) => `${(num / 1000).toFixed(0)}k`;

  if (min && max) return `${symbol}${formatK(min)} - ${symbol}${formatK(max)}`;
  if (min) return `${symbol}${formatK(min)}+`;
  return `Up to ${symbol}${formatK(max!)}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function Dashboard() {
  return (
    <div className="flex flex-col space-y-6 max-w-7xl mx-auto w-full p-6">
      {/* Page Title & Core Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">
          Applications
        </h1>
        <AddApplicationDialog />
      </div>

      {/* Understated Summary Stats Bar */}
      <div className="flex items-center space-x-6 rounded-lg border bg-card px-4 py-3 text-card-foreground shadow-xs w-fit">
        <div className="flex flex-col">
          <span className="text-xl font-bold font-mono text-foreground leading-none">
            24
          </span>
          <span className="text-[11px] text-muted-foreground mt-1 font-medium">
            Active
          </span>
        </div>

        <Separator orientation="vertical" className="h-7" />

        <div className="flex flex-col">
          <span className="text-xl font-bold font-mono text-primary leading-none">
            7
          </span>
          <span className="text-[11px] text-primary/90 mt-1 font-semibold">
            Follow-ups
          </span>
        </div>

        <Separator orientation="vertical" className="h-7" />

        <div className="flex flex-col">
          <span className="text-xl font-bold font-mono text-foreground leading-none">
            3
          </span>
          <span className="text-[11px] text-muted-foreground mt-1 font-medium">
            Offers
          </span>
        </div>
      </div>

      {/* Applications Data Section */}
      <div className="space-y-3 pt-1">
        {/* Cohesive Toolbar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, company, or tech..."
              className="pl-8 h-9 text-xs"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 h-9 text-xs text-muted-foreground hover:text-foreground"
          >
            <SlidersHorizontalIcon className="h-3.5 w-3.5" />
            Filters
          </Button>
        </div>

        {/* Table Container */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-xs overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30 border-b">
                <TableHead className="w-70 py-3 pl-4 pr-2">
                  Role & Company
                </TableHead>
                <TableHead className="w-30 py-3 px-2">Status</TableHead>
                <TableHead className="w-37.5 py-3 px-2">Location</TableHead>
                <TableHead className="w-35 py-3 px-2">Salary Range</TableHead>
                <TableHead className="w-55 py-3 px-2">Tech Stack</TableHead>
                <TableHead className="w-25 py-3 px-2">Applied</TableHead>
                <TableHead className="w-12 py-3 pr-3 pl-0 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockApplications.map((app) => (
                <TableRow
                  key={app.id}
                  className="hover:bg-muted/20 transition-colors duration-150"
                >
                  {/* Role & Company */}
                  <TableCell className="py-3 pl-4 pr-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-foreground tracking-tight">
                          {app.job_title}
                        </span>
                        <a
                          href={app.job_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground/60 hover:text-primary transition-colors inline-flex items-center"
                        >
                          <ExternalLinkIcon className="h-3 w-3" />
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="font-medium text-muted-foreground/90">
                          {app.company}
                        </span>
                        <span className="text-[10px] text-muted-foreground/40">
                          •
                        </span>
                        <span className="text-muted-foreground/70">
                          {app.platform}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="py-3 px-2">
                    {getStatusBadge(app.status)}
                  </TableCell>

                  {/* Location */}
                  <TableCell className="py-3 px-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-xs text-foreground">
                        <MapPinIcon className="h-3.5 w-3.5 text-muted-foreground/70 shrink-0" />
                        <span className="truncate max-w-31.25">
                          {app.location || "N/A"}
                        </span>
                      </div>
                      {app.location_type && (
                        <span className="text-[10px] text-muted-foreground/70 font-mono tracking-wider pl-4">
                          {app.location_type}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Salary Range */}
                  <TableCell className="py-3 px-2 text-xs font-mono font-medium text-foreground/90">
                    {formatSalary(
                      app.salary_min,
                      app.salary_max,
                      app.salary_currency
                    )}
                  </TableCell>

                  {/* Tech Stack */}
                  <TableCell className="py-3 px-2">
                    <div className="flex flex-wrap gap-1 max-w-52.5 items-center">
                      {app.skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-[10px] px-1.5 py-0 h-4 font-normal bg-muted/20 border-border/60 text-muted-foreground shadow-none"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {app.skills.length > 3 && (
                        <span className="text-[10px] text-muted-foreground/70 font-mono pl-0.5">
                          +{app.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Applied Date */}
                  <TableCell className="py-3 px-2 text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(app.created_at)}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="py-3 pr-3 pl-0 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground/70 hover:text-foreground hover:bg-muted/50"
                        >
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Update status</DropdownMenuItem>
                        {app.contact_mail && (
                          <DropdownMenuItem className="gap-2">
                            <MailIcon className="h-3.5 w-3.5" /> Send follow-up
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
