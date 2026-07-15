import ScrollUp from "@/app/_components/ScrollUp";
import Hero from "./_components/home/Hero";
import Testimonials from "./_components/home/Testimonials";
import VoiceAIPanel from "./_components/home/VoiceAIPanel";
import InsuranceDenialCalculator from "./_components/home/InsuranceDenialCalculator";
import DashboardPreview from "./_components/home/DashboardPreview";
import Offerings from "./_components/home/Offerings";
import Pipeline from "./_components/home/Pipeline";
import HealthcareTechnologistsCarousel from "./_components/home/HealthcareTechnologistsCarousel";
import EHRCarousel from "./_components/home/EHRCarousel";

export default function Home() {
  return (
    <>
      <ScrollUp data-oid="l76ff4z" />
      <Hero data-oid="wfk8cn5" />

      <Testimonials data-oid="testimonials" />

      <VoiceAIPanel data-oid="voice-ai-panel" />

      <DashboardPreview data-oid="d6dekul" />
      <HealthcareTechnologistsCarousel data-oid="healthcare-technologists" />
      <EHRCarousel data-oid="ehr-carousel" />

      {/* Anika's Insurance Denial Calculator */}
      <InsuranceDenialCalculator data-oid="8ig740o" />

      {/* Commented out - As featured in section */}
      {/* <section className="py-8 text-center md:py-8 lg:py-8" data-oid=":rxhft5">
        <div className="container" data-oid="q4gtrxj">
          <div
            className="mt-12 flex flex-wrap justify-center md:mt-24 "
            data-oid="x.xppnx"
          >
            <InfiniteCarousel data-oid="dm8xkns" />
          </div>
        </div>
      </section> */}

      {/* Commented out - Why leading providers partner with Kyron Medical section */}
      {/* <section className="py-8 text-center md:py-20 lg:py-4" data-oid="6ovcjx9">
        <div className="container" data-oid="_:npne3">
          <SectionTitle
            title="Why leading providers partner with Kyron Medical"
            paragraph="Trusted by healthcare leaders for comprehensive solutions that deliver results"
            center
            data-oid=":7t5owp"
          />

          <div
            className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            data-oid="lqf3p4h"
          >
            <div
              className="group relative overflow-hidden rounded-xl bg-card p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              data-oid="efyq39x"
            >
              <div className="mb-6" data-oid="wu1j8_1">
                <Image
                  src="/images/logo/kyron_medical.png"
                  alt="World Class Team"
                  width={60}
                  height={60}
                  className="mx-auto"
                  data-oid="07you4d"
                />
              </div>
              <h3
                className="mb-4 text-xl font-bold text-foreground"
                data-oid="7m5m1rr"
              >
                World Class Team
              </h3>
              <p className="text-muted-foreground" data-oid="hzgj6-a">
                A white glove service team dedicated to your success
              </p>
              <div
                className="absolute -right-12 -top-12 h-24 w-24 rotate-12 transform bg-blue-500/10 transition-transform duration-300 group-hover:rotate-45"
                data-oid="eb1n_z9"
              ></div>
            </div>

            <div
              className="group relative overflow-hidden rounded-xl bg-card p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              data-oid="_t-smdk"
            >
              <div
                className="mb-6 flex flex-row justify-center gap-2 sm:grid sm:grid-cols-3 sm:justify-start"
                data-oid="1.8d8yl"
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded bg-blue-100 dark:bg-blue-900/30"
                  data-oid="d1tba6:"
                >
                  <Image
                    src="/images/icons/webpt.png"
                    alt="WebPT"
                    width={20}
                    height={20}
                    data-oid="lb1e-nh"
                  />
                </div>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded bg-blue-100 dark:bg-blue-900/30"
                  data-oid="9:zwbvg"
                >
                  <Image
                    src="/images/icons/athena.png"
                    alt="Athena"
                    width={20}
                    height={20}
                    data-oid="vu4v8fm"
                  />
                </div>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded bg-blue-100 dark:bg-blue-900/30"
                  data-oid=":g3ghia"
                >
                  <Image
                    src="/images/icons/epic.png"
                    alt="Epic"
                    width={20}
                    height={20}
                    data-oid="pybtd_f"
                  />
                </div>
              </div>
              <h3
                className="mb-4 text-xl font-bold text-foreground"
                data-oid="3_km6kw"
              >
                Seamless Integration
              </h3>
              <p className="text-muted-foreground" data-oid="-wqkmiq">
                Integrating with all healthcare applications in the cloud and
                on-prem
              </p>
              <div
                className="absolute -right-12 -top-12 h-24 w-24 rotate-12 transform bg-green-500/10 transition-transform duration-300 group-hover:rotate-45"
                data-oid="6edu:62"
              ></div>
            </div>

            <div
              className="group relative overflow-hidden rounded-xl bg-card p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              data-oid=".4na96:"
            >
              <div className="mb-6" data-oid="o3g7co8">
                <div
                  className="mx-auto h-16 w-16 overflow-hidden rounded-full bg-blue-100 p-3 dark:bg-blue-900/30"
                  data-oid="dt41-zv"
                >
                  <div
                    className="h-full w-full rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"
                    data-oid="0g04if1"
                  ></div>
                </div>
              </div>
              <h3
                className="mb-4 text-xl font-bold text-foreground"
                data-oid="0gl179x"
              >
                ROI Obsessed
              </h3>
              <p className="text-muted-foreground" data-oid="h082z7j">
                Adding millions in revenue with our performance-driven
                contracts.
              </p>
              <div
                className="absolute -right-12 -top-12 h-24 w-24 rotate-12 transform bg-purple-500/10 transition-transform duration-300 group-hover:rotate-45"
                data-oid="8atju17"
              ></div>
            </div>

            <div
              className="group relative overflow-hidden rounded-xl bg-card p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              data-oid="8ib6wwz"
            >
              <div className="mb-6" data-oid=":yn6hij">
                <div
                  className="mx-auto flex h-16 w-16 items-center justify-center"
                  data-oid="i5e8n:3"
                >
                  <div className="relative h-12 w-12" data-oid="p.9nl2v">
                    <div
                      className="absolute bottom-0 h-8 w-8 rounded bg-blue-200 dark:bg-blue-900/30"
                      data-oid="_t:22py"
                    ></div>
                    <div
                      className="absolute bottom-2 right-2 h-8 w-8 rounded bg-blue-300 dark:bg-blue-800/30"
                      data-oid="060qdk:"
                    ></div>
                    <div
                      className="absolute bottom-4 right-4 h-8 w-8 rounded bg-blue-400 dark:bg-blue-700/30"
                      data-oid="-kc:tu4"
                    ></div>
                  </div>
                </div>
              </div>
              <h3
                className="mb-4 text-xl font-bold text-foreground"
                data-oid="eqc5ndq"
              >
                Vendor Consolidation
              </h3>
              <p className="text-muted-foreground" data-oid="pag2z1b">
                One unified platform for every department—cutting your tool and
                vendor expenses.
              </p>
              <div
                className="absolute -right-12 -top-12 h-24 w-24 rotate-12 transform bg-blue-500/10 transition-transform duration-300 group-hover:rotate-45"
                data-oid="611cxcb"
              ></div>
            </div>
          </div>

          <div
            className="mt-20 grid grid-cols-1 gap-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 md:grid-cols-3"
            data-oid="a_n5ap9"
          >
            <div className="text-center text-white" data-oid="olt53s7">
              <h4 className="mb-2 text-4xl font-bold" data-oid="9ptj6d0">
                &gt;95%
              </h4>
              <p className="text-blue-100" data-oid=":zab2ek">
                AI Call Success Rate
              </p>
            </div>
            <div className="text-center text-white" data-oid="d.1ujmf">
              <h4 className="mb-2 text-4xl font-bold" data-oid="gcw5l8k">
                &gt;$100M
              </h4>
              <p className="text-blue-100" data-oid="4qxfv09">
                Claims Data Processed
              </p>
            </div>
            <div className="text-center text-white" data-oid="jy-b_40">
              <h4 className="mb-2 text-4xl font-bold" data-oid="s3l56xz">
                &gt;1000 Hours
              </h4>
              <p className="text-blue-100" data-oid="zjjp6lb">
                call time saved
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <Offerings data-oid="jystpaq" />

      <Pipeline data-oid="2-9polm" />
      {/* <Testimonials /> */}
    </>
  );
}
