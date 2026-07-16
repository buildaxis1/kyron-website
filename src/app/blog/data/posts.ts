export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  featured?: boolean;
  content: { heading?: string; paragraphs: string[] }[];
}

export const categories = [
  "All",
  "Voice AI",
  "Revenue Cycle",
  "Patient Experience",
  "Company News",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "voice-ai-payer-calls",
    title: "Why voice AI is the missing piece in revenue cycle management",
    excerpt:
      "Billing teams spend hours on hold with payers every day. Here's how voice AI changes the economics of eligibility checks, prior auth, and claim follow-ups.",
    category: "Revenue Cycle",
    author: "Kyron Medical Team",
    authorRole: "Product",
    date: "2026-07-08",
    readTime: "6 min read",
    featured: true,
    content: [
      {
        paragraphs: [
          "Ask any medical billing team where their day goes, and you'll hear the same answer: the phone. Eligibility verification, prior authorization status, claim inquiries, denial clarification — nearly every step of the revenue cycle still runs through a payer phone line, complete with IVR mazes and forty-minute hold queues.",
          "The math is brutal. A single payer call averages 25–45 minutes end to end, and a mid-sized practice can need dozens of them per day. That's full-time headcount spent waiting on hold — not working denials, not appealing underpayments, not helping patients.",
        ],
      },
      {
        heading: "What voice AI actually changes",
        paragraphs: [
          "Voice AI doesn't just transcribe calls — it makes them. Kyron's RCM AI navigates payer IVR systems, waits on hold, asks the right questions, and captures structured outcomes: coverage details, auth status, denial reasons, appeal timelines.",
          "Because the AI can run many calls in parallel and work outside business hours, the bottleneck disappears. Your team starts the morning with answers instead of a call list.",
        ],
      },
      {
        heading: "Where the ROI shows up",
        paragraphs: [
          "Practices see impact in three places: staff hours reclaimed from hold time, faster reimbursement because claims stop aging in 'pending' status, and fewer write-offs because denial reasons get clarified and appealed while they're still actionable.",
          "The revenue cycle has always been a communication problem disguised as a paperwork problem. Voice AI finally addresses it at the source: the phone call.",
        ],
      },
    ],
  },
  {
    slug: "ai-receptionist-missed-calls",
    title: "The real cost of a missed patient call — and how AI answers it",
    excerpt:
      "Practices miss up to a third of inbound calls during peak hours. Each one is a patient who may not call back. An AI receptionist changes that equation.",
    category: "Patient Experience",
    author: "Kyron Medical Team",
    authorRole: "Product",
    date: "2026-06-24",
    readTime: "5 min read",
    content: [
      {
        paragraphs: [
          "Front desks are stretched thin. Between checking in patients, handling paperwork, and answering the phone, something has to give — and it's usually the phone. Industry studies consistently show practices missing 20–35% of inbound calls during peak hours.",
          "Every missed call is a potential no-show, a delayed refill, or a new patient who books with the practice down the street. For most clinics, the phone is still the single biggest driver of both revenue and patient frustration.",
        ],
      },
      {
        heading: "An AI receptionist that patients actually like",
        paragraphs: [
          "Modern voice AI is a different experience from the phone trees patients dread. Kyron's Medical AI Receptionist answers immediately, speaks naturally, and completes real tasks: scheduling and rescheduling appointments, answering common questions, routing urgent calls to staff.",
          "Every conversation is transcribed and summarized, so staff have full context without listening to voicemails. Nothing falls through the cracks — including the calls that come in at 7pm on a Friday.",
        ],
      },
      {
        heading: "Getting started",
        paragraphs: [
          "Rollout takes days, not months. The AI connects to your existing scheduling workflow, learns your practice's FAQs, and starts by handling overflow and after-hours calls before taking on more.",
        ],
      },
    ],
  },
  {
    slug: "denial-intelligence-explained",
    title: "Denial Intelligence: turning claim denials into a data problem",
    excerpt:
      "Most practices treat denials as one-off firefights. Denial Intelligence treats them as a pattern to be found, fixed, and prevented.",
    category: "Revenue Cycle",
    author: "Kyron Medical Team",
    authorRole: "Engineering",
    date: "2026-06-10",
    readTime: "7 min read",
    content: [
      {
        paragraphs: [
          "Claim denials cost US providers billions every year, and the majority are preventable. But prevention requires knowing why claims are denied — and payer denial codes are notoriously vague. 'Additional information required' tells you almost nothing.",
          "Denial Intelligence combines automated payer calls with analytics: the AI calls to clarify the real reason behind each denial, and the platform aggregates those reasons into patterns your team can act on.",
        ],
      },
      {
        heading: "From reactive to proactive",
        paragraphs: [
          "Once denial reasons are structured data, the questions change. Instead of 'which claims do we appeal this week?' you can ask 'which payer, code, and provider combinations drive our denials — and what do we change upstream?'",
          "Practices using this approach typically find that a handful of root causes explain most of their denial volume. Fixing those is worth far more than any individual appeal.",
        ],
      },
      {
        heading: "The dashboard",
        paragraphs: [
          "The Denial Intelligence dashboard tracks denial rates by payer and reason, appeal outcomes, and dollars recovered — giving billing leaders the visibility they've never had from EHR reports alone.",
        ],
      },
    ],
  },
  {
    slug: "healthcare-voice-ai-security",
    title: "How we think about security and compliance for healthcare voice AI",
    excerpt:
      "Voice AI in healthcare means handling PHI over the phone. Here's the security posture we believe every practice should demand from a vendor.",
    category: "Voice AI",
    author: "Kyron Medical Team",
    authorRole: "Security",
    date: "2026-05-28",
    readTime: "6 min read",
    content: [
      {
        paragraphs: [
          "Phone calls in healthcare are full of protected health information: names, dates of birth, member IDs, diagnoses. Any AI system that touches those calls must be built for HIPAA from the ground up — not retrofitted.",
          "That means encryption in transit and at rest, strict access controls, audit logging on every interaction, and business associate agreements as a default, not an upsell.",
        ],
      },
      {
        heading: "Questions to ask any voice AI vendor",
        paragraphs: [
          "Where is call audio stored, and for how long? Who can access transcripts? Is PHI redacted from logs and model training pipelines? Can you produce an audit trail for a specific patient interaction? A trustworthy vendor answers these without hesitation.",
          "We publish our answers because we believe the bar for healthcare AI should be high — and transparent.",
        ],
      },
    ],
  },
  {
    slug: "kyron-website-refresh",
    title: "A fresh look for Kyron Medical: new site, same mission",
    excerpt:
      "We've redesigned kyronmedical.com to better showcase our Medical AI Receptionist and RCM AI products — plus a new careers page and this blog.",
    category: "Company News",
    author: "Kyron Medical Team",
    authorRole: "Company",
    date: "2026-07-15",
    readTime: "3 min read",
    content: [
      {
        paragraphs: [
          "Kyron Medical has grown from a denial-intelligence product into a voice AI platform for healthcare operations — and our website needed to catch up.",
          "The refreshed homepage now tells the full story: the Medical AI Receptionist that answers patient calls, the Revenue Cycle Management AI that works payer phone lines, and the Denial Intelligence platform that ties it together with analytics.",
        ],
      },
      {
        heading: "What's new",
        paragraphs: [
          "Alongside the homepage refresh you'll find a new Careers page — we're hiring across engineering, customer success, and sales — and this blog, where we'll share product updates, industry insights, and lessons from building voice AI for healthcare.",
          "Same brand, same mission: giving healthcare its time back.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
