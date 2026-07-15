import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Info,
  ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Twilio SIP Import | Kyron Medical Docs",
  description:
    "Step-by-step guide to import a Twilio phone number into Kyron Medical via SIP trunk.",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Numbered step wrapper */
function Step({
  number,
  children,
}: {
  number: number;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex gap-5">
      {/* Vertical connector line */}
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted/50 text-sm font-semibold text-foreground">
          {number}
        </div>
        <div className="mt-2 w-px flex-1 bg-border/40" />
      </div>
      <div className="pb-10 pt-0.5 w-full">{children}</div>
    </div>
  );
}

/** Image placeholder – swap src once real screenshots exist */
function Screenshot({ alt, src }: { alt: string; src?: string }) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border/60 bg-muted/30 shadow-sm">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full object-cover" />
      ) : (
        <div className="flex h-44 items-center justify-center gap-3 text-muted-foreground/50">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M21 3H3m18 0v18M3 3v18"
            />
          </svg>
          <span className="text-sm">{alt}</span>
        </div>
      )}
    </div>
  );
}

/** Callout boxes */
function Callout({
  type,
  children,
}: {
  type: "warning" | "info" | "success";
  children: React.ReactNode;
}) {
  const map = {
    warning: {
      Icon: AlertTriangle,
      border: "border-amber-500/30",
      bg: "bg-amber-500/5",
      icon: "text-amber-500",
    },
    info: {
      Icon: Info,
      border: "border-blue-500/30",
      bg: "bg-blue-500/5",
      icon: "text-blue-400",
    },
    success: {
      Icon: CheckCircle2,
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      icon: "text-emerald-500",
    },
  }[type];

  return (
    <div
      className={`mt-4 flex gap-3 rounded-xl border ${map.border} ${map.bg} p-4 text-sm text-muted-foreground`}
    >
      <map.Icon className={`mt-0.5 h-4 w-4 shrink-0 ${map.icon}`} />
      <div>{children}</div>
    </div>
  );
}

/** Inline code */
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md border border-border/60 bg-muted/60 px-1.5 py-0.5 font-mono text-[0.82em] text-foreground">
      {children}
    </code>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TwilioSipPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* Decorative blobs – matches AboutSectionOne */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500/8 to-pink-500/8 blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        />
      </div>

      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container relative py-16 md:py-20 lg:py-28">
        <div className="mx-auto max-w-3xl">

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Kyron
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/telephony"
              className="hover:text-foreground transition-colors"
            >
              Telephony
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href="/telephony/sip"
              className="hover:text-foreground transition-colors"
            >
              SIP
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Twilio</span>
          </nav>

          {/* Page header */}
          <div className="mb-10 flex items-start gap-4">
            <div className="rounded-xl border border-border/60 bg-background/70 p-3 shadow-sm backdrop-blur">
              <Phone className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Importing via SIP
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Twilio SIP Import
              </h1>
              <p className="mt-2 text-base text-muted-foreground">
                Import a Twilio phone number into Kyron Medical.
              </p>
            </div>
          </div>

          {/* Card container */}
          <div className="rounded-2xl border border-border/60 bg-background/70 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10">

            {/* Intro */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              Follow the steps below to connect a Twilio number to Kyron via a
              SIP trunk. You'll set up an Elastic SIP Trunk, configure
              credentials, add an origination URI pointing to Kyron, and attach
              your phone number.
            </p>

            {/* Divider */}
            <div className="my-8 h-px w-full bg-border/40" />

            {/* Steps */}
            <div>
              {/* Step 1 */}
              <Step number={1}>
                <h2 className="font-semibold text-foreground">
                  Open Elastic SIP Trunks in Twilio
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Go to the{" "}
                  <a
                    href="https://console.twilio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    Twilio Console
                  </a>{" "}
                  and search for{" "}
                  <strong className="text-foreground">"Elastic SIP Trunks"</strong>,
                  then navigate to that page.
                </p>
                <Screenshot alt="Twilio Console – Elastic SIP Trunks search result" src="/images/docs/twilio-elastic-sip-trunks.avif" />
              </Step>

              {/* Step 2 */}
              <Step number={2}>
                <h2 className="font-semibold text-foreground">
                  Create a new SIP Trunk
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Click <strong className="text-foreground">Create new SIP Trunk</strong>.
                  You'll be taken to the configuration page automatically.
                </p>
              </Step>

              {/* Step 3 */}
              <Step number={3}>
                <h2 className="font-semibold text-foreground">
                  Set a Termination SIP URI
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Open the <strong className="text-foreground">Termination</strong> tab
                  and enter a Termination SIP URI — you can choose any URI you
                  like.
                </p>
                <Screenshot alt="Termination tab – Termination SIP URI field" src="/images/docs/twilio-sip-termination.avif" />
                <Callout type="warning">
                  Leave <strong>Secure Trunking disabled</strong>. Enabling it
                  will prevent Kyron from connecting to your trunk.
                </Callout>
              </Step>

              {/* Step 4 */}
              <Step number={4}>
                <h2 className="font-semibold text-foreground">
                  Create a Credential List
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  In the <strong className="text-foreground">Credential Lists</strong>{" "}
                  section, create a new credential list. Use a strong username
                  and password.
                </p>
                <Callout type="info">
                  Leave the{" "}
                  <strong>IP Access Control List empty</strong>. Kyron does not
                  support a static IP range for outbound SIP calls outside of
                  the Enterprise plan.{" "}
                  <Link
                    href="/contact"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    Contact us
                  </Link>{" "}
                  if a static IP range is a security requirement for your use
                  case.
                </Callout>
              </Step>

              {/* Step 5 */}
              <Step number={5}>
                <h2 className="font-semibold text-foreground">Save the trunk</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Click <strong className="text-foreground">Save</strong> to
                  apply your termination settings.
                </p>
              </Step>

              {/* Step 6 */}
              <Step number={6}>
                <h2 className="font-semibold text-foreground">
                  Enable Call Transfer (SIP REFER)
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Go to{" "}
                  <strong className="text-foreground">General</strong> and enable{" "}
                  <strong className="text-foreground">Call Transfer (SIP REFER)</strong>.
                </p>
                <Screenshot alt="General tab – Call Transfer (SIP REFER) toggle enabled" src="/images/docs/twilio-sip-transfer.avif" />
              </Step>

              {/* Step 7 */}
              <Step number={7}>
                <h2 className="font-semibold text-foreground">
                  Add a Kyron Origination URI
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Open the <strong className="text-foreground">Origination</strong> tab,
                  click{" "}
                  <strong className="text-foreground">
                    Add New Origination URI
                  </strong>
                  , and enter:
                </p>
                <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
                  <Code>sip:sip.vogent.ai</Code>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Then click <strong className="text-foreground">Add</strong>.
                </p>
                <Screenshot alt="Origination tab – sip:sip.vogent.ai added as origination URI" src="/images/docs/twilio-sip-origination.avif" />
              </Step>

              {/* Step 8 */}
              <Step number={8}>
                <h2 className="font-semibold text-foreground">
                  Attach your phone numbers
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Open the <strong className="text-foreground">Numbers</strong> tab and
                  add the phone numbers you want to use for inbound calls.
                </p>
                <Screenshot alt="Numbers tab – phone numbers attached to the SIP trunk" src="/images/docs/twilio-sip-numbers.avif" />
              </Step>

              {/* Step 9 – final, no line */}
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-sm font-semibold text-emerald-500">
                    9
                  </div>
                </div>
                <div className="pb-2 pt-0.5 w-full">
                  <h2 className="font-semibold text-foreground">
                    Confirm with your Kyron representative
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Let your Kyron Medical representative know all steps above
                    are complete so we can test the setup end to end.
                  </p>
                  <Callout type="success">
                    Once confirmed, Kyron will validate inbound and outbound
                    call routing and give you the green light.
                  </Callout>
                </div>
              </div>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link
              href="/telephony/sip"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to SIP overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
