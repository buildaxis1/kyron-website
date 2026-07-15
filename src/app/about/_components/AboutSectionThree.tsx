"use client";

import Image from "next/image";
import { toast } from "sonner";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

type Advisor = {
  name: string;
  title: string;
  image: string;
  link?: string;
};

const advisors: Advisor[] = [
  {
    name: "Ainsley MacLean, MD",
    title:
      "Founding Partner, Ainsley Advisory Group. Former Chief AI Officer, Kaiser Permanente. Brown Class of 2001, MD 2005",
    image: "/images/advisors/ainsley-maclean.jpg",
  },
  {
    name: "Andy Beck, MD, PhD",
    title: "Co‑Founder & CEO, PathAI. Brown Class of 2002, MD 2006",
    image: "/images/advisors/andy-beck.jpg",
  },
  {
    name: "Jacob Joseph, MD",
    title:
      "Cardiologist, Translational Data Science Expert. Professor of Medicine, The Warren Alpert Medical School",
    image: "/images/advisors/jacob-joseph.jpg",
  },
  {
    name: "Abigail Kohler",
    title: "Co‑Founder & CEO, ResusciTech. Adjunct Lecturer, Brown University",
    image: "/images/advisors/abby-kohler.jpg",
  },
  {
    name: "Corey Keller, MD, PhD",
    title:
      "PI, Stanford Precision Neurotherapeutics Lab. Assistant Professor, Stanford Medicine",
    image: "/images/advisors/corey-keller.jpg",
  },
  {
    name: "Chad Billmyer",
    title:
      "Founded Panjo (acq. by Tapatalk), Foresite Solutions (acq. by Nelnet). Brown Class of 2001",
    image: "/images/advisors/chad-billmyer.jpg",
  },
  {
    name: "Yuhao Huang, MD",
    title:
      "Post‑Doctoral Researcher, Stanford School of Medicine. Multiple papers in Nature journals",
    image: "/images/advisors/yuhao-huang.jpg",
  },
  {
    name: "Robbie Felton",
    title:
      "Co‑Founder & CEO, IntusCare. Forbes 30 Under 30. Brown Class of 2021",
    image: "/images/advisors/robbie-felton.jpg",
  },
  {
    name: "David Ronick",
    title:
      "Co‑Founded Minded, Stash, WinWin. Mentor at TechStars, HBS, Brown University",
    image: "/images/advisors/david-ronick.jpg",
  },
  {
    name: "Charlie Maddock",
    title: "Co‑Founder & CEO, INO ARMOR. Brown Class of 2004",
    image: "/images/advisors/charlie-maddock.jpg",
  },
  {
    name: "Julie Pilitsis, MD, PhD, MBA",
    title:
      "Chair of Neurosurgery, University of Arizona College of Medicine. Physician Executive",
    image: "/images/advisors/julie-pilitsis.jpg",
  },
  {
    name: "Nicholas Grumbach, MD",
    title: "Assistant Professor of Medicine and Pediatrics, Brown University",
    image: "/images/advisors/nicholas-grumbach.jpg",
  },
  {
    name: "Cliff Wang, MD, MBA",
    title: "Co‑CEO, Tang+Company. Wharton MBA Alum",
    image: "/images/advisors/cliff-wang.jpg",
  },
  {
    name: "Donnie Rizzo",
    title:
      "Healthcare Technology Executive. Ex‑Quest Diagnostics, Ex‑UnitedHealth Group",
    image: "/images/advisors/donnie-rizzo.jpg",
  },
  {
    name: "Nadia Smati, MD",
    title:
      "Partner, Ainsley Advisory Group. ex‑Kaiser Permanente, Stanford Alum",
    image: "/images/advisors/nadia-smati.jpg",
  },
];

export default function AboutSectionThree() {
  const onOpen = (name: string, link?: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }
    toast.message(name, { description: "Advisor profile coming soon." });
  };

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Meet our advisors
          </div>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Guidance from leaders in healthcare and AI
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advisors.map((a) => (
            <article
              key={a.name}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 shadow-sm transition hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-border/70">
                  <Image
                    src={a.image}
                    alt={a.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{a.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    Advisor • External
                  </p>
                </div>
              </div>

              <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-muted-foreground">
                {a.title}
              </p>

              <button
                onClick={() => onOpen(a.name, a.link)}
                className="mt-4 inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium transition hover:bg-accent"
              >
                Learn more
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
