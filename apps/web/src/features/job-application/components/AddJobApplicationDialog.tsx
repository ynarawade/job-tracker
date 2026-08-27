"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createJobApplication } from "@/features/job-application/actions/createApplication.action";
import {
  createJobApplicationSchema,
  type createJobApplicationSchemaType,
} from "@/features/job-application/validators/job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function AddApplicationDialog() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createJobApplicationSchemaType>({
    resolver: zodResolver(createJobApplicationSchema),
    defaultValues: {
      jdText: `## About the job

Fireflies.ai is the leading AI teammate for meetings, trusted by more than 20 million users across over 500,000 organizations, from fast-growing startups to Fortune 500 enterprises. Fireflies captures knowledge, automates repetitive work, and helps teams become more productive before, during, and after every meeting.

Fireflies has achieved unicorn status with a valuation exceeding $1 billion. In 2024, Ramp recognized Fireflies as the sixth most popular AI platform by number of paying customers, alongside companies including OpenAI, Midjourney, and Anthropic. There is a good chance you have already seen Fireflies quietly powering one of your recent meetings.

We are looking for a product-minded Full Stack Engineer who wants to own meaningful problems from end to end. This is a generalist role, not a position tied to one team or one layer of the stack. Depending on the problem, you may work across frontend experiences, backend services, APIs, databases, infrastructure, data systems, or internal tools.

We are an AI-native engineering organization. Our strongest engineers use coding agents to move faster, run work in parallel, and compound what the team learns, while remaining fully accountable for the architecture, code, testing, security, and customer outcome. We want engineers who combine speed with judgment, communicate clearly in an async environment, and consistently turn ambiguous problems into reliable products.

### What you'll do:

- Own customer and business problems from discovery and technical design through implementation, deployment, measurement, and iteration.
- Build products and systems across the stack, choosing the right layer and tools for each problem rather than staying inside a narrow specialty.
- Work closely with product, design, support, and engineering teammates to identify high-leverage opportunities and turn them into shipped outcomes.
- Use AI coding agents and modern development tools to plan, build, review, test, document, and improve software at high velocity.
- Run multiple streams of work effectively, unblock yourself, and make progress visible even when a project is uncertain or blocked.
- Make thoughtful tradeoffs among speed, quality, complexity, scalability, security, and maintainability.
- Review code with strong judgment, give candid and useful feedback, and help the team move decisions and pull requests forward quickly.
- Turn lessons from incidents, reviews, and customer feedback into better tests, documentation, tooling, and reusable engineering context.
- Measure the impact of what you ship and keep iterating until it produces a meaningful result for customers or the business.
- Contribute ideas beyond the initial brief. We value engineers who spot opportunities, challenge assumptions, and build the first version rather than waiting for perfect instructions.

### What we're looking for:

- At least 3 years of professional software engineering experience, with meaningful experience building across both backend and frontend systems.
- A record of owning and shipping production software end to end, not only completing isolated tickets or implementing detailed specifications.
- Strong product judgment and a customer-focused approach to technical decisions.
- Fluency with AI-assisted development. You have a real workflow for using coding agents to increase speed and quality, and you understand that the human engineer remains accountable for the result.
- Strong written and verbal communication. You can explain complex ideas clearly, share progress without being chased, ask for feedback early, and work effectively in a remote, async team.
- Sound engineering judgment across architecture, APIs, data modeling, reliability, performance, testing, observability, and security.
- Experience making systems scale, with concrete examples of bottlenecks, tradeoffs, and lessons from operating production software.
- High initiative, urgency, and curiosity. You learn unfamiliar systems quickly, propose ideas, and find a path forward when the answer is not obvious.
- Attention to detail and pride in craft. You care whether the experience works well for users, not merely whether the code compiles.
- Comfort giving and receiving candid feedback, reviewing teammates' work, and improving shared standards.

Our primary stack includes Node.js, NestJS, Go, GraphQL, React, Next.js, MongoDB, GCP, and Kubernetes. Direct experience with every technology is not required. We care more about learning speed, engineering depth, and the ability to make sound decisions in unfamiliar systems.

### What stands out:

- You have built or operated systems at meaningful scale and can explain what broke, what you changed, and how you measured the result.
- You have created products, tools, open-source projects, or substantial side projects that show initiative and technical taste.
- You have improved a product or process without waiting for someone to assign the work.
- You use multiple AI agents or parallel development workflows effectively, while maintaining a high bar for correctness and security.
- You can point to work where you combined engineering, product thinking, and customer insight to create measurable impact.
- You have worked successfully in a fast-moving startup or another environment with broad ownership and limited bureaucracy.

### How we work:

- We move in fast, incremental engineering cycles and prefer learning from shipped work over debating hypothetical perfection.
- We overcommunicate progress, decisions, risks, and blockers because our team works across countries and time zones.
- We use data and customer feedback to decide what matters and to measure whether our work succeeded.
- We automate repetitive work and continuously improve the context, tools, and standards that help both people and agents perform better.
- We expect engineers to take accountability and initiative. Freedom here comes with ownership of the outcome.
- We value candid feedback, low ego, strong opinions held with curiosity, and teammates who make the people around them better.
- We aim to get meaningfully better every week.

### Perks and benefits:

- Competitive compensation
- Work remotely from anywhere
- Opportunities to move laterally and grow rapidly
- Paid time off and a flexible leave policy
- A no-boss culture that empowers you to take ownership
- Flexible working hours
- LGBTQ+ friendly workplace
- International offsites to connect and recharge
- Technology reimbursements to support your work

### About Fireflies.ai:

At Fireflies.ai, we are changing how teams use AI in their daily work. Our culture champions security, innovation, customer experience, and growth. Backed by $19 million from investors including Canaan and Khosla Ventures, plus angels from Slack, Facebook, Dropbox, Amazon, and Salesforce, Fireflies is driven by a global team of more than 100 people across over 20 countries and every time zone. We are building a world-class, global-first company, and we use our own product to do it.

Fireflies.ai is an equal opportunity employer. We strongly value diversity because our team is stronger with different perspectives and experiences. We do not discriminate based on race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, disability status, or any other protected characteristic.`,
      jobUrl:
        "https://wellfound.com/jobs?job_listing_slug=4617746-full-stack-engineer",
    },
  });

  async function onSubmit(data: createJobApplicationSchemaType) {
    const response = await createJobApplication(data);

    if (response.statusCode >= 400) {
      toast.error(response.message);
      return;
    }

    toast.success("Application added — extracting details in the background");
    reset();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2 shadow-xs h-9">
          <PlusIcon className="h-4 w-4" />
          Add application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[70vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add job application</DialogTitle>
            <DialogDescription>
              Paste the Job posting URL & JD then wait for magic.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4 space-y-4">
            <Field>
              <Label htmlFor="job-url">Job posting URL</Label>
              <Input
                id="job-url"
                placeholder="https://..."
                disabled={isSubmitting}
                {...register("jobUrl")}
              />
              {errors.jobUrl && (
                <FieldError className="text-xs text-destructive mt-1">
                  {errors.jobUrl.message}
                </FieldError>
              )}
            </Field>
            <Field>
              <Label htmlFor="jd-text">Paste Job Description</Label>
              <Textarea
                id="jd-text"
                rows={5}
                className="max-h-64 overflow-y-auto resize-none"
                placeholder="We are seeking a talented and motivated..."
                disabled={isSubmitting}
                {...register("jdText")}
              />
              {errors.jdText && (
                <FieldError className="text-xs text-destructive mt-1">
                  {errors.jdText.message}
                </FieldError>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2Icon className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Saving..." : "Save Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddApplicationDialog;
