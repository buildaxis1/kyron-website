"use client";

import Orb from "@/app/_components/ui/orb";

const Offerings = () => {
  return (
    <section
      className="relative -mt-24 overflow-hidden py-8 text-center md:py-20 lg:py-4"
      data-oid="622xtpr"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% -10%, rgba(2,132,199,0.10), transparent 50%), radial-gradient(900px 500px at 100% 10%, rgba(79,70,229,0.10), transparent 50%)",
      }}
    >
      {/* Grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 72%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.10)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container relative" data-oid="xsk0.x.">
        <div
          className="mt-8 grid grid-cols-1 gap-6 pt-12 md:grid-cols-2 md:pt-24"
          data-oid="xameac6"
        >
          <div
            className="flex transform flex-col items-start rounded-lg border bg-card p-6 shadow-lg transition-transform hover:scale-105 md:flex-row"
            data-oid="9brzfvb"
          >
            <div
              className="mb-4 flex h-24 w-24 flex-shrink-0 items-center justify-center self-center md:mb-0 md:mr-6 md:h-32 md:w-32 md:self-start"
              data-oid="4s6_5fh"
            >
              <Orb color="pink" data-oid="q_jp203" />
            </div>
            <div className="min-w-0 flex-1" data-oid=".2wepct">
              <h3
                className="mb-3 text-lg font-semibold text-foreground md:text-xl"
                data-oid="dnikl3a"
              >
                Eligibility and Benefits
              </h3>
              <p className="text-left text-foreground" data-oid="dxpufb4">
                <span className="font-bold" data-oid="5oev_b.">
                  Verify coverage instantly.
                </span>{" "}
                Our Al agent retrieves and confirms patient eligibility and
                benefit details in seconds, helping staff provide accurate
                information and avoid claim rejections.
              </p>
            </div>
          </div>
          <div
            className="flex transform flex-col items-start rounded-lg border bg-card p-6 shadow-lg transition-transform hover:scale-105 md:flex-row"
            data-oid="xk6lto0"
          >
            <div
              className="mb-4 flex h-24 w-24 flex-shrink-0 items-center justify-center self-center md:mb-0 md:mr-6 md:h-32 md:w-32 md:self-start"
              data-oid="77tkvtc"
            >
              <Orb color="green" data-oid="kdapfhf" />
            </div>
            <div className="min-w-0 flex-1" data-oid="2t05_nj">
              <h3
                className="mb-3 text-lg font-semibold text-foreground md:text-xl"
                data-oid="wu8u36s"
              >
                Claim Status Inquiries
              </h3>
              <p className="text-left text-foreground" data-oid="0f-rnzn">
                <span className="font-bold" data-oid="y4imdn.">
                  Get claim updates without the wait.
                </span>{" "}
                Al handles payer calls, checks claim progress, and provides
                real-time status updates, freeing your team from long hold
                times.
              </p>
            </div>
          </div>
          <div
            className="flex transform flex-col items-start rounded-lg border bg-card p-6 shadow-lg transition-transform hover:scale-105 md:flex-row"
            data-oid="pv26-9."
          >
            <div
              className="mb-4 flex h-24 w-24 flex-shrink-0 items-center justify-center self-center md:mb-0 md:mr-6 md:h-32 md:w-32 md:self-start"
              data-oid="d8:1zmu"
            >
              <Orb color="pearl" data-oid="y74x91n" />
            </div>
            <div className="min-w-0 flex-1" data-oid="lo0cl:f">
              <h3
                className="mb-3 text-lg font-semibold text-foreground md:text-xl"
                data-oid="kmz-54_"
              >
                Prior Authorization
              </h3>
              <p className="text-left text-foreground" data-oid="uboae96">
                <span className="font-bold" data-oid="4c9ypoi">
                  Faster approvals, fewer delays.
                </span>{" "}
                Al gathers required documentation, submits authorizations, and
                tracks responses automatically, helping patients start care
                sooner.
              </p>
            </div>
          </div>
          <div
            className="flex transform flex-col items-start rounded-lg border bg-card p-6 shadow-lg transition-transform hover:scale-105 md:flex-row"
            data-oid="3-o-3yo"
          >
            <div
              className="mb-4 flex h-24 w-24 flex-shrink-0 items-center justify-center self-center md:mb-0 md:mr-6 md:h-32 md:w-32 md:self-start"
              data-oid="8oh-nw3"
            >
              <Orb color="orange" data-oid="uefudfo" />
            </div>
            <div className="min-w-0 flex-1" data-oid="mz2-xfd">
              <h3
                className="mb-3 text-lg font-semibold text-foreground md:text-xl"
                data-oid="kq19-sx"
              >
                Denial Appeals
              </h3>
              <p className="text-left text-foreground" data-oid="t9banw6">
                <span className="font-bold" data-oid="v552cfl">
                  Recover revenue with precision.
                </span>{" "}
                Al makes voice calls to payers, handles appeal conversations,
                and tracks outcomes automatically, increasing overturn rates and
                reducing manual work for billing teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Offerings;
