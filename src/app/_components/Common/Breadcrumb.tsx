interface BreadcrumbProps {
  pageName: string;
  description: string;
  "data-oid"?: string;
}

const Breadcrumb = ({ pageName, description, ...props }: BreadcrumbProps) => {
  return (
    <>
      <section
        className="relative z-10 overflow-hidden bg-muted"
        data-oid="8njhm7r"
      >
        <div className="container py-16 lg:py-24" data-oid="d09yyrt">
          <div
            className="flex flex-col items-center text-center"
            data-oid="c9pewyi"
          >
            {/* <div className="relative mb-6 inline-block">
                                          <span className="absolute -left-6 -top-6 z-[-1] h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30"></span>
                                          <span className="absolute -bottom-6 -right-6 z-[-1] h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30"></span>
                                          <ul className="flex items-center rounded-full bg-white px-4 py-2 shadow-md dark:bg-gray-800">
                                            <li className="flex items-center">
                                              <Link
                                                href="/"
                                                className="pr-1 text-sm font-medium text-body-color hover:text-primary"
                                              >
                                                Home
                                              </Link>
                                              <span className="mx-3 block h-1.5 w-1.5 rotate-45 border-r-2 border-t-2 border-body-color"></span>
                                            </li>
                                            <li className="text-sm font-medium text-primary">{pageName}</li>
                                          </ul>
                                         </div> */}

            <h1
              className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text pb-2 text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl"
              data-oid="afkv1d8"
            >
              {pageName}
            </h1>

            <p
              className="mx-auto max-w-2xl text-center text-lg text-muted-foreground"
              data-oid="68wv:v_"
            >
              {description}
            </p>

            <div
              className="mt-8 flex items-center justify-center space-x-4"
              data-oid="iyv5xi."
            >
              <span
                className="inline-flex h-1 w-12 rounded bg-blue-500"
                data-oid="qp::21-"
              ></span>
              <span
                className="inline-flex h-1 w-3 rounded bg-blue-500"
                data-oid="y:ouj14"
              ></span>
              <span
                className="inline-flex h-1 w-1 rounded bg-blue-500"
                data-oid="ixwco18"
              ></span>
            </div>
          </div>
        </div>

        <div data-oid="ybxz0qr">
          <span className="absolute left-0 top-0 z-[-1]" data-oid="jrjh7n:">
            <svg
              width="287"
              height="254"
              viewBox="0 0 287 254"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-oid="p_upft6"
            >
              <path
                opacity="0.1"
                d="M286.5 0.5L-14.5 254.5V69.5L286.5 0.5Z"
                fill="url(#paint0_linear_111:578)"
                data-oid="73e3njr"
              />

              <defs data-oid="m40pb:g">
                <linearGradient
                  id="paint0_linear_111:578"
                  x1="-40.5"
                  y1="117"
                  x2="301.926"
                  y2="-97.1485"
                  gradientUnits="userSpaceOnUse"
                  data-oid="d_tjkyg"
                >
                  <stop stopColor="#4A6CF7" data-oid="httq2wz" />
                  <stop
                    offset="1"
                    stopColor="#4A6CF7"
                    stopOpacity="0"
                    data-oid="7.f1x_4"
                  />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="absolute right-0 top-0 z-[-1]" data-oid="o6tg4zl">
            <svg
              width="628"
              height="258"
              viewBox="0 0 628 258"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-oid="hxk51sz"
            >
              <path
                opacity="0.1"
                d="M669.125 257.002L345.875 31.9983L524.571 -15.8832L669.125 257.002Z"
                fill="url(#paint0_linear_0:1)"
                data-oid=":b5ou84"
              />

              <path
                opacity="0.1"
                d="M0.0716344 182.78L101.988 -15.0769L142.154 81.4093L0.0716344 182.78Z"
                fill="url(#paint1_linear_0:1)"
                data-oid="bnv8ahx"
              />

              <defs data-oid="318of_k">
                <linearGradient
                  id="paint0_linear_0:1"
                  x1="644"
                  y1="221"
                  x2="429.946"
                  y2="37.0429"
                  gradientUnits="userSpaceOnUse"
                  data-oid="qvy:4qi"
                >
                  <stop stopColor="#4A6CF7" data-oid="q.jwf3j" />
                  <stop
                    offset="1"
                    stopColor="#4A6CF7"
                    stopOpacity="0"
                    data-oid="e61s70u"
                  />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_0:1"
                  x1="18.3648"
                  y1="166.016"
                  x2="105.377"
                  y2="32.3398"
                  gradientUnits="userSpaceOnUse"
                  data-oid="h6_::x9"
                >
                  <stop stopColor="#4A6CF7" data-oid="l8zfwyc" />
                  <stop
                    offset="1"
                    stopColor="#4A6CF7"
                    stopOpacity="0"
                    data-oid=":y5uk:-"
                  />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb;
