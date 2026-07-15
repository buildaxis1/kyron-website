import Breadcrumb from "@/app/_components/Common/Breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | Kyron",
  description:
    "Frequently Asked Questions about Kyron's AI-driven healthcare solutions",
};

// FAQ Category component

export default function FAQPage() {
  return (
    <>
      <Breadcrumb
        pageName="Frequently Asked Questions"
        description="Find answers to common questions about Kyron's AI-driven healthcare solutions"
        data-oid="2.d2epb"
      />

      <section className="pb-[120px] pt-[120px]" data-oid=".84:qgb">
        <div className="container" data-oid="9k3focp">
          {/* Main FAQ Container */}
          <div className="mx-auto max-w-4xl" data-oid="o:0-892">
            {/* FAQ Categories */}
            <div
              className="mb-12 flex flex-wrap justify-center gap-4"
              data-oid=".9tmh2:"
            >
              <Link
                href={"#general"}
                className="rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                data-oid="t0678dt"
              >
                General
              </Link>
              <Link
                href={"#technology"}
                className="rounded-full bg-muted px-6 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/80"
                data-oid="5z2i6xw"
              >
                Technology
              </Link>
              <Link
                href={"#implementation"}
                className="rounded-full bg-muted px-6 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/80"
                data-oid="bf_s0uw"
              >
                Implementation
              </Link>
              <Link
                href={"#pricing"}
                className="rounded-full bg-muted px-6 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted/80"
                data-oid="-5om._t"
              >
                Pricing
              </Link>
            </div>

            {/* FAQ Items */}
            <div className="space-y-6" data-oid="wg7rmg1">
              {/* General Questions Section */}
              <div className="mb-10" id="general" data-oid=".wfjk7l">
                <h2
                  className="mb-6 text-2xl font-bold text-foreground"
                  data-oid="xd.cl1b"
                >
                  General Questions
                </h2>

                {/* FAQ Item 1 */}
                <div
                  className="mb-6 overflow-hidden rounded-lg border border-border"
                  data-oid="yl70w6g"
                >
                  <button
                    className="flex w-full items-center justify-between bg-card px-6 py-4 text-left transition-colors hover:bg-muted"
                    data-oid="01rz385"
                  >
                    <span
                      className="text-lg font-semibold text-foreground"
                      data-oid="6pqg6fi"
                    >
                      What is Kyron Medical?
                    </span>
                    <span
                      className="text-2xl text-muted-foreground"
                      data-oid="-a-:f9z"
                    >
                      +
                    </span>
                  </button>
                  <div className="bg-card px-6 py-4" data-oid="h6lny-r">
                    <p className="text-muted-foreground" data-oid="32c0q.w">
                      Kyron Medical is a healthcare technology company that
                      specializes in AI-powered denial management solutions. We
                      help healthcare providers automate and optimize their
                      revenue cycle processes to improve efficiency and increase
                      revenue.
                    </p>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div
                  className="mb-6 overflow-hidden rounded-lg border border-border"
                  data-oid="8kzq:4."
                >
                  <button
                    className="flex w-full items-center justify-between bg-card px-6 py-4 text-left transition-colors hover:bg-muted"
                    data-oid="8x.wki1"
                  >
                    <span
                      className="text-lg font-semibold text-foreground"
                      data-oid="wv.eu1e"
                    >
                      How does Kyron differ from other healthcare technology
                      solutions?
                    </span>
                    <span
                      className="text-2xl text-muted-foreground"
                      data-oid="c0gtbfv"
                    >
                      +
                    </span>
                  </button>
                  <div className="bg-card px-6 py-4" data-oid="asqeio_">
                    <p className="text-muted-foreground" data-oid="xh23z9-">
                      Kyron stands apart from traditional healthcare technology
                      solutions in several key ways:
                    </p>
                    <ul
                      className="list-inside list-disc space-y-2 text-muted-foreground"
                      data-oid="rau-i3r"
                    >
                      <li data-oid="zwzjrje">
                        <strong data-oid="4acqi7u">AI-First Approach:</strong>{" "}
                        Our platform is built from the ground up with artificial
                        intelligence at its core, not as an afterthought.
                      </li>
                      <li data-oid=".4du730">
                        <strong data-oid="np::rp6">
                          End-to-End Integration:
                        </strong>{" "}
                        Kyron offers a comprehensive solution that addresses the
                        entire revenue cycle, eliminating the need for multiple
                        disconnected systems.
                      </li>
                      <li data-oid="p06mrhi">
                        <strong data-oid="p12qwbh">Adaptive Learning:</strong>{" "}
                        Our AI continuously learns from your practice&apos;s
                        data, becoming more effective over time.
                      </li>
                      <li data-oid="5n3f30m">
                        <strong data-oid=".gi-pyu">
                          Performance-Based Pricing:
                        </strong>{" "}
                        We align our success with yours through our innovative
                        pricing model.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div
                  className="overflow-hidden rounded-lg border border-border"
                  data-oid="-0tmhjg"
                >
                  <button
                    className="flex w-full items-center justify-between bg-card px-6 py-4 text-left transition-colors hover:bg-muted"
                    data-oid="ormurt-"
                  >
                    <span
                      className="text-lg font-semibold text-foreground"
                      data-oid="9.94btf"
                    >
                      What types of healthcare providers can benefit from Kyron?
                    </span>
                    <span
                      className="text-2xl text-muted-foreground"
                      data-oid="51xc-.y"
                    >
                      +
                    </span>
                  </button>
                  <div className="bg-card px-6 py-4" data-oid="1q6msgg">
                    <p className="text-muted-foreground" data-oid="t5bv9d1">
                      Kyron&apos;s solutions are designed to benefit a wide
                      range of healthcare providers, including:
                    </p>
                    <ul
                      className="list-inside list-disc space-y-1 text-muted-foreground"
                      data-oid="4qu53u6"
                    >
                      <li data-oid="jiis9md">
                        Independent physician practices
                      </li>
                      <li data-oid="ezpbrbc">Multi-specialty groups</li>
                      <li data-oid="o2qvt2e">Hospitals and health systems</li>
                      <li data-oid="n.58cj1">Ambulatory surgery centers</li>
                      <li data-oid="hx95:u8">Behavioral health providers</li>
                      <li data-oid="_g8hln2">Physical therapy practices</li>
                      <li data-oid=":pc3v-d">Dental practices</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technology Section */}
              <div className="mb-10" id="technology" data-oid="8a3s11l">
                <h2
                  className="mb-6 text-2xl font-bold text-foreground"
                  data-oid="6:ntq8:"
                >
                  Our Technology
                </h2>

                {/* FAQ Item 1 */}
                <div
                  className="mb-6 overflow-hidden rounded-lg border border-border"
                  data-oid="gn25p:m"
                >
                  <button
                    className="flex w-full items-center justify-between bg-card px-6 py-4 text-left transition-colors hover:bg-muted"
                    data-oid="owqt87n"
                  >
                    <span
                      className="text-lg font-semibold text-foreground"
                      data-oid="znnb98f"
                    >
                      How does Kyron&apos;s AI technology work?
                    </span>
                    <span
                      className="text-2xl text-muted-foreground"
                      data-oid="kr214lg"
                    >
                      +
                    </span>
                  </button>
                  <div className="bg-card px-6 py-4" data-oid="3u5loyq">
                    <p className="text-muted-foreground" data-oid="91czqgz">
                      Kyron&apos;s AI technology works through a sophisticated
                      combination of machine learning algorithms, natural
                      language processing, and predictive analytics. Our system:
                    </p>
                    <ol
                      className="list-inside list-decimal space-y-2 text-muted-foreground"
                      data-oid="5hsg87r"
                    >
                      <li data-oid="pmjfu9w">
                        <strong data-oid="_jflg25">Analyzes patterns</strong> in
                        your billing data, claim submissions, and payer
                        responses
                      </li>
                      <li data-oid=":t6ey:.">
                        <strong data-oid="e-kyjqz">
                          Identifies potential issues
                        </strong>{" "}
                        before claims are submitted
                      </li>
                      <li data-oid="l2aab5_">
                        <strong data-oid="uuhjj5p">
                          Recommends optimizations
                        </strong>{" "}
                        to improve clean claims rates and reduce denials
                      </li>
                      <li data-oid="h8oby5j">
                        <strong data-oid="8kdu93b">
                          Automates routine tasks
                        </strong>{" "}
                        like eligibility verification and prior authorization
                      </li>
                      <li data-oid="ftrxkg1">
                        <strong data-oid="bu01f6w">Continuously learns</strong>{" "}
                        from outcomes to improve future performance
                      </li>
                    </ol>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div
                  className="overflow-hidden rounded-lg border border-border"
                  data-oid="j_a5k:v"
                >
                  <button
                    className="flex w-full items-center justify-between bg-card px-6 py-4 text-left transition-colors hover:bg-muted"
                    data-oid="zbxvp7h"
                  >
                    <span
                      className="text-lg font-semibold text-foreground"
                      data-oid="czq7cds"
                    >
                      Can Kyron integrate with my existing EHR/PM system?
                    </span>
                    <span
                      className="text-2xl text-muted-foreground"
                      data-oid="k8lg18j"
                    >
                      +
                    </span>
                  </button>
                  <div className="bg-card px-6 py-4" data-oid="9y0.zsj">
                    <p className="text-muted-foreground" data-oid="5nzgiiq">
                      Yes, Kyron is designed to integrate seamlessly with most
                      major Electronic Health Record (EHR) and Practice
                      Management (PM) systems, including Epic, Cerner,
                      Athenahealth, and many others.
                    </p>
                    <p className="text-muted-foreground" data-oid="9eke_09">
                      Our integration process is designed to be minimally
                      disruptive to your existing workflows. We use secure API
                      connections and follow industry standards to ensure
                      compatibility and data security.
                    </p>
                  </div>
                </div>
              </div>

              {/* Implementation Section */}
              <div className="mb-10" id="implementation" data-oid="af0-ae.">
                <h2
                  className="mb-6 text-2xl font-bold text-foreground"
                  data-oid="-w1h0te"
                >
                  Implementation
                </h2>

                {/* FAQ Item 1 */}
                <div
                  className="mb-6 overflow-hidden rounded-lg border border-border"
                  data-oid="tqlr7-6"
                >
                  <button
                    className="flex w-full items-center justify-between bg-card px-6 py-4 text-left transition-colors hover:bg-muted"
                    data-oid="bdpcdms"
                  >
                    <span
                      className="text-lg font-semibold text-foreground"
                      data-oid="tdj..ei"
                    >
                      What does the implementation process look like?
                    </span>
                    <span
                      className="text-2xl text-muted-foreground"
                      data-oid="3a:-dl1"
                    >
                      +
                    </span>
                  </button>
                  <div className="bg-card px-6 py-4" data-oid="ql2330i">
                    <p className="text-muted-foreground" data-oid="yhoh5_3">
                      Our implementation process is designed to be thorough yet
                      efficient, typically taking 4-6 weeks from start to
                      finish. Here&apos;s what you can expect:
                    </p>
                    <ol
                      className="list-inside list-decimal space-y-2 text-muted-foreground"
                      data-oid="l5jw44v"
                    >
                      <li data-oid="gmoid17">
                        <strong data-oid="2mi0_24">
                          Discovery & Planning:
                        </strong>{" "}
                        We conduct a comprehensive assessment of your current
                        processes and identify optimization opportunities.
                      </li>
                      <li data-oid="kem:6ck">
                        <strong data-oid="khgxtn8">System Integration:</strong>{" "}
                        Our team works with your IT department to establish
                        secure connections with your existing systems.
                      </li>
                      <li data-oid="7h07ud7">
                        <strong data-oid="okfxhx:">Data Migration:</strong> We
                        safely transfer and validate your historical data to
                        ensure accuracy.
                      </li>
                      <li data-oid="79_eo1:">
                        <strong data-oid="0:r0lws">Training & Testing:</strong>{" "}
                        Your team receives comprehensive training and conducts
                        thorough testing before going live.
                      </li>
                      <li data-oid="o0lf1w-">
                        <strong data-oid="axutp1m">Go-Live & Support:</strong>{" "}
                        We provide ongoing support during the transition and
                        beyond.
                      </li>
                    </ol>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div
                  className="overflow-hidden rounded-lg border border-border"
                  data-oid="prfb.e1"
                >
                  <button
                    className="flex w-full items-center justify-between bg-card px-6 py-4 text-left transition-colors hover:bg-muted"
                    data-oid="umh-vl."
                  >
                    <span
                      className="text-lg font-semibold text-foreground"
                      data-oid="risuqrp"
                    >
                      How quickly can I see results after implementing Kyron?
                    </span>
                    <span
                      className="text-2xl text-muted-foreground"
                      data-oid="ggwtn95"
                    >
                      +
                    </span>
                  </button>
                  <div className="bg-card px-6 py-4" data-oid="v4fuln.">
                    <p className="text-muted-foreground" data-oid="xjo9:ky">
                      Most clients begin seeing measurable improvements within
                      the first 30-60 days of implementation. These initial
                      results typically include:
                    </p>
                    <ul
                      className="list-inside list-disc space-y-1 text-muted-foreground"
                      data-oid="0czgjyq"
                    >
                      <li data-oid="nu0m3..">Reduction in claim denials</li>
                      <li data-oid="_y5u7j_">Faster payment processing</li>
                      <li data-oid="ldxr6y1">
                        Decreased administrative workload
                      </li>
                      <li data-oid="vsl1n14">Improved clean claims rate</li>
                    </ul>
                    <p
                      className="mt-4 text-muted-foreground"
                      data-oid="um4o2di"
                    >
                      The full benefits of Kyron&apos;s AI-driven optimization
                      continue to grow over time as our system learns from your
                      practice&apos;s specific patterns and challenges.
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Section */}
              <div id="pricing" data-oid="6_f1pv8">
                <h2
                  className="mb-6 text-2xl font-bold text-foreground"
                  data-oid="znih1ls"
                >
                  Pricing & Billing
                </h2>

                {/* FAQ Item 1 */}
                <div
                  className="mb-6 overflow-hidden rounded-lg border border-border"
                  data-oid="ud-wsz-"
                >
                  <button
                    className="flex w-full items-center justify-between bg-card px-6 py-4 text-left transition-colors hover:bg-muted"
                    data-oid="c9vde.0"
                  >
                    <span
                      className="text-lg font-semibold text-foreground"
                      data-oid="lo24ngr"
                    >
                      How is Kyron priced?
                    </span>
                    <span
                      className="text-2xl text-muted-foreground"
                      data-oid="uvprl_1"
                    >
                      +
                    </span>
                  </button>
                  <div className="bg-card px-6 py-4" data-oid="3_:57sg">
                    <p className="text-muted-foreground" data-oid="1otrgnk">
                      Kyron offers flexible pricing models designed to align
                      with your practice&apos;s needs and goals:
                    </p>
                    <ul
                      className="list-inside list-disc space-y-2 text-muted-foreground"
                      data-oid="gnr.41_"
                    >
                      <li data-oid="hvth_:d">
                        <strong data-oid="hyvm869">Subscription Model:</strong>{" "}
                        Fixed monthly fee based on practice size and volume
                      </li>
                      <li data-oid="9v:2oh_">
                        <strong data-oid="0_fy8hb">
                          Performance-Based Model:
                        </strong>{" "}
                        Pay based on the value we deliver through improved
                        revenue
                      </li>
                      <li data-oid="10ozegc">
                        <strong data-oid="z0jf8e-">Hybrid Model:</strong>{" "}
                        Combination of base subscription with performance
                        incentives
                      </li>
                    </ul>
                    <p
                      className="mt-4 text-muted-foreground"
                      data-oid="5rxgfge"
                    >
                      All pricing models include implementation, training, and
                      ongoing support. We work with each client to determine the
                      most advantageous pricing structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div
              className="mt-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center shadow-xl"
              data-oid="s3t-ptf"
            >
              <h3
                className="mb-4 text-2xl font-bold text-white"
                data-oid="f1cl.wa"
              >
                Still have questions?
              </h3>
              <p className="mb-6 text-blue-100" data-oid="n9lckx_">
                Our team is ready to help you find the right solution for your
                healthcare practice.
              </p>
              <Link
                href="https://kyronmedical.com/contact"
                className="inline-block rounded-lg bg-white px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
                data-oid="64a-lfq"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
