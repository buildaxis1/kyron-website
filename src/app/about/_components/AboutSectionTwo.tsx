"use client";

import Image from "next/image";
import { toast } from "sonner";
import { ArrowUpRight, Users, User } from "lucide-react";

type Member = {
  name: string;
  title: string;
  image: string;
  link?: string;
};

const teamMembers: Member[] = [
  { name: "Jay Gopal", title: "CEO", image: "/images/team/jay-gopal.jpg" },
  {
    name: "Andrew Chan",
    title: "Head of Marketing",
    image: "/images/team/andrew-chan.jpg",
  },
  {
    name: "Lita Crichton",
    title: "Head of Business Development",
    image: "/images/team/lita-crichton.jpg",
  },
  {
    name: "Thanmay Kumar",
    title: "Sales & Marketing",
    image: "/images/team/thanmay-kumar.png",
  },
  {
    name: "Maguire Anuszewski",
    title: "Medical Consultant",
    image: "/images/team/maguire-anuszewski.jpg",
  },
  {
    name: "Carina D'Souza",
    title: "Team Member",
    image: "/images/team/carina-dsouza.jpg",
  },
   {
    name: "Poojith Reddy",
    title: "Team Member",
    image: "/images/team/poojith-reddy.jpg",
  },
    {
    name: "Prasad Velmurugan",
    title: "Marketing",
    image: "/images/team/prasad-velmurugan.jpg",
  },
  {
    name: "Leopold Huang",
    title: "Team Member",
    image: "/images/team/leopold-huang.jpg",
  },
  { 
    name: "Hitaesh Saravanarajan",
    title: "Team Member",
    image: "/images/team/hitaesh-s.jpg",
  },
  {
    name: "Karishma Rohatgi",
    title: "Team Member",
    image: "/images/team/karishma-r.jpg",
  },
  {    name: "Veda Dayananda",
    title: "Team Member",
    image: "/images/team/veda-dayananda.jpg",
  },
  {
    name: "Gloria Yao",
    title: "Team Member",
    image: "/images/team/gloria.jpg",
  },

];

// Optional: mark executives for a small label, but the card size is identical
const execNames = new Set(["Jay Gopal"]);

export default function AboutSectionTwo() {
  const onViewProfile = (name: string, link?: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
      return;
    }
    toast.info(`${name}`, {
      description: "Profile coming soon.",
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background py-12 md:py-20 lg:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/8 to-blue-500/8 blur-3xl animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute -right-32 top-2/3 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500/8 to-pink-500/8 blur-3xl animate-pulse" style={{ animationDuration: '11s' }} />
      </div>

      {/* Animated grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
        <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container relative">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            Meet our team
          </div>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The people shaping our vision
          </h2>
        </div>

        {/* Equal-size, executive-style cards for everyone */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {teamMembers.map((m) => (
            <article
              key={m.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-4 shadow-sm backdrop-blur transition hover:shadow-lg"
            >
              {/* Square image block (drives consistent height) */}
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-muted">
                {m.image ? (
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className={`transition duration-300 group-hover:scale-105 ${
                      m.name === "Jay Gopal" 
                        ? "object-cover object-center" 
                        : "object-cover"
                    }`}
                    style={m.name === "Jay Gopal" ? { objectPosition: "center 5%" } : {}}
                  />
                ) : (
                  <User className="h-16 w-16 text-muted-foreground" />
                )}
              </div>

              {/* Info footer (consistent spacing) */}
              <div className="mt-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-semibold">{m.name}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {m.title}
                  </p>
                </div>

                <button
                  onClick={() => onViewProfile(m.name, m.link)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium transition hover:bg-accent"
                >
                  View profile
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
