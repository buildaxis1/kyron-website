"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer
        className="relative z-10 overflow-hidden border-t border-border/30 bg-gradient-to-b from-background via-background to-muted/30 pt-20 md:pt-24 lg:pt-28"
        data-oid="h558eq_"
      >
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-500/8 to-pink-500/8 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-t from-cyan-500/8 to-transparent blur-3xl" />
        </div>

        {/* Animated grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="container relative mx-auto px-4" data-oid="gj34ina">
          <div className="-mx-4 flex flex-wrap gap-y-8 md:gap-y-0" data-oid="nqkjo32">
            <div
              className="w-full px-4 sm:w-full md:w-full lg:w-5/12 xl:w-5/12"
              data-oid="h0w.9tl"
            >
              <div className="mb-12 max-w-[400px] lg:mb-16" data-oid="ag-gk_f">
                <Link
                  href="/"
                  className="footer-logo mb-8 inline-block transition-all duration-300 hover:scale-105 hover:brightness-110"
                  data-oid="3uwdsnf"
                >
                  <Image
                    src="/images/logo/kyron_medical.png"
                    alt="logo"
                    className="w-full dark:hidden"
                    width={140}
                    height={30}
                    data-oid="eiz_x8_"
                  />

                  <Image
                    src="/images/logo/kyron_medical.png"
                    alt="logo"
                    className="hidden w-full dark:block"
                    width={140}
                    height={30}
                    data-oid="x-8n263"
                  />
                </Link>
                <p
                  className="mb-8 text-sm leading-relaxed text-muted-foreground/90"
                  data-oid="9uijwr1"
                >
                  Transforming healthcare through innovative technology solutions.
                </p>
                <div
                  className="footer-social flex flex-col gap-4"
                  data-oid="e695hkn"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Follow us</span>
                  <div className="flex items-center gap-3">
                  {/* <a
                                                            href="/"
                                                            aria-label="social-link"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mr-6 mb-4 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                                           >
                                                            <svg
                                                              width="18"
                                                              height="18"
                                                              viewBox="0 0 22 22"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                d="M12.1 10.4939V7.42705C12.1 6.23984 13.085 5.27741 14.3 5.27741H16.5V2.05296L13.5135 1.84452C10.9664 1.66676 8.8 3.63781 8.8 6.13287V10.4939H5.5V13.7183H8.8V20.1667H12.1V13.7183H15.4L16.5 10.4939H12.1Z"
                                                                fill="currentColor"
                                                              />
                                                            </svg>
                                                           </a> */}
                  {/* <a
                                                            href="/"
                                                            aria-label="social-link"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mr-6 mb-4 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                                           >
                                                            <svg
                                                              width="18"
                                                              height="18"
                                                              viewBox="0 0 22 22"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                              <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M13.9831 19.25L9.82094 13.3176L4.61058 19.25H2.40625L8.843 11.9233L2.40625 2.75H8.06572L11.9884 8.34127L16.9034 2.75H19.1077L12.9697 9.73737L19.6425 19.25H13.9831ZM16.4378 17.5775H14.9538L5.56249 4.42252H7.04674L10.808 9.6899L11.4584 10.6039L16.4378 17.5775Z"
                                                                fill="currentColor"
                                                              />
                                                            </svg>
                                                           </a> */}
                  {/* <a
                                                            href="/"
                                                            aria-label="social-link"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mr-6 mb-4 text-body-color duration-300 hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                                                           >
                                                            <svg
                                                              width="18"
                                                              height="14"
                                                              viewBox="0 0 18 14"
                                                              className="fill-current"
                                                            >
                                                              <path d="M17.5058 2.07119C17.3068 1.2488 16.7099 0.609173 15.9423 0.395963C14.5778 7.26191e-08 9.0627 0 9.0627 0C9.0627 0 3.54766 7.26191e-08 2.18311 0.395963C1.41555 0.609173 0.818561 1.2488 0.619565 2.07119C0.25 3.56366 0.25 6.60953 0.25 6.60953C0.25 6.60953 0.25 9.68585 0.619565 11.1479C0.818561 11.9703 1.41555 12.6099 2.18311 12.8231C3.54766 13.2191 9.0627 13.2191 9.0627 13.2191C9.0627 13.2191 14.5778 13.2191 15.9423 12.8231C16.7099 12.6099 17.3068 11.9703 17.5058 11.1479C17.8754 9.68585 17.8754 6.60953 17.8754 6.60953C17.8754 6.60953 17.8754 3.56366 17.5058 2.07119ZM7.30016 9.44218V3.77687L11.8771 6.60953L7.30016 9.44218Z" />
                                                            </svg>
                                                           </a> */}
                  <a
                    href="https://www.linkedin.com/company/kyron-medical/"
                    aria-label="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-background/80 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/15 hover:text-primary hover:shadow-2xl hover:shadow-primary/30"
                    data-oid="ghwbqxd"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:from-primary/10 group-hover:to-transparent group-hover:opacity-100" />
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      className="fill-current transition-transform duration-300 group-hover:scale-110"
                      data-oid="a5h59he"
                    >
                      <path
                        d="M15.2196 0H1.99991C1.37516 0 0.875366 0.497491 0.875366 1.11936V14.3029C0.875366 14.8999 1.37516 15.4222 1.99991 15.4222H15.1696C15.7943 15.4222 16.2941 14.9247 16.2941 14.3029V1.09448C16.3441 0.497491 15.8443 0 15.2196 0ZM5.44852 13.1089H3.17444V5.7709H5.44852V13.1089ZM4.29899 4.75104C3.54929 4.75104 2.97452 4.15405 2.97452 3.43269C2.97452 2.71133 3.57428 2.11434 4.29899 2.11434C5.02369 2.11434 5.62345 2.71133 5.62345 3.43269C5.62345 4.15405 5.07367 4.75104 4.29899 4.75104ZM14.07 13.1089H11.796V9.55183C11.796 8.7061 11.771 7.58674 10.5964 7.58674C9.39693 7.58674 9.222 8.53198 9.222 9.47721V13.1089H6.94792V5.7709H9.17202V6.79076H9.19701C9.52188 6.19377 10.2466 5.59678 11.3711 5.59678C13.6952 5.59678 14.12 7.08925 14.12 9.12897V13.1089H14.07Z"
                        data-oid="wfji4q0"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/kyronmedical/"
                    aria-label="instagram-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-background/80 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/60 hover:bg-gradient-to-br hover:from-purple-500/15 hover:via-pink-500/15 hover:to-orange-500/15 hover:text-pink-500 hover:shadow-2xl hover:shadow-pink-500/30"
                    data-oid="4ooaile"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-orange-500/10 group-hover:opacity-100" />
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current transition-transform duration-300 group-hover:scale-110"
                      data-oid="vg3k6tq"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.281.059-2.563.334-3.637 1.408-1.074 1.074-1.349 2.356-1.408 3.637-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.059 1.281.334 2.563 1.408 3.637 1.074 1.074 2.356 1.349 3.637 1.408 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.281-.059 2.563-.334 3.637-1.408 1.074-1.074 1.349-2.356 1.408-3.637.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.059-1.281-.334-2.563-1.408-3.637-1.074-1.074-2.356-1.349-3.637-1.408-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.207 0-4-1.793-4-4s1.793-4 4-4 4 1.793 4 4-1.793 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.441s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.441-1.441-1.441z"
                        data-oid="5czct2l"
                      />
                    </svg>
                  </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-3/12"
              data-oid="szf564r"
            >
              <div className="mb-12 lg:mb-16" data-oid="05z3dhk">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-foreground/40 via-foreground/20 to-transparent" />
                  <h2
                    className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-lg font-bold tracking-tight text-transparent"
                    data-oid="rvmu8bj"
                  >
                    Useful Links
                  </h2>
                </div>
                <ul className="space-y-4" data-oid="wzo69sp">
                  <li data-oid="9-yvr8-">
                    <Link
                      href="https://kyronmedical.com/contact"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 hover:pl-4 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                      data-oid="unek5c8"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary/10 to-transparent transition-transform duration-300 group-hover:translate-x-0" />
                      <svg className="relative h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-[-10deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="relative font-medium">
                        Request a Demo
                      </span>
                    </Link>
                  </li>
                  <li data-oid="3__x-t3">
                    <Link
                      href="/about"
                      aria-label="Link to About page"
                      role="button"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 hover:pl-4 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                      data-oid="nhoztnw"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary/10 to-transparent transition-transform duration-300 group-hover:translate-x-0" />
                      <svg className="relative h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-[-10deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="relative font-medium">
                        About
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-4/12"
              data-oid="-bph6vo"
            >
              <div className="mb-12 lg:mb-16" data-oid="..s_kr2">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-foreground/40 via-foreground/20 to-transparent" />
                  <h2
                    className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-lg font-bold tracking-tight text-transparent"
                    data-oid="x7z9g.q"
                  >
                    Social Media
                  </h2>
                </div>
                <ul className="space-y-4" data-oid="s3ic7s4">
                  <li data-oid="jyd9at5">
                    <Link
                      href="https://www.linkedin.com/company/kyron-medical/"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 hover:pl-4 hover:text-primary hover:shadow-lg hover:shadow-primary/10"
                      data-oid="yugtn.c"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary/10 to-transparent transition-transform duration-300 group-hover:translate-x-0" />
                      <svg className="relative h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-[-10deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="relative font-medium">
                        LinkedIn
                      </span>
                    </Link>
                  </li>
                  <li data-oid="moeqs92">
                    <Link
                      href="https://www.instagram.com/kyronmedical/"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-pink-500/5 hover:pl-4 hover:text-pink-500 hover:shadow-lg hover:shadow-pink-500/10"
                      data-oid="k5r0spb"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 transition-transform duration-300 group-hover:translate-x-0" />
                      <svg className="relative h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-[-10deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="relative font-medium">
                        Instagram
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar with copyright */}
          <div className="relative mt-12 overflow-hidden border-t border-border/30 bg-gradient-to-b from-transparent via-muted/10 to-muted/30 py-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px animate-pulse bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" style={{ animationDuration: '3s' }} />
            <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
              <p className="flex flex-col items-center gap-2 text-sm text-muted-foreground/80 sm:flex-row">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">©</span>
                <span>2026 Kyron Medical Inc. All rights reserved.</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground sm:gap-8">
                <Link 
                  href="https://8tg47xoyc4.ufs.sh/f/awQXenfztGCdoCjOiE53461J0fMyUouiXFLhS2dGWEVkYBHC" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative overflow-hidden rounded-md px-3 py-1.5 transition-all duration-300 hover:bg-primary/5 hover:text-primary"
                >
                  <span className="relative z-10 font-medium">Privacy Policy</span>
                  <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-primary/10 to-transparent transition-transform duration-300 group-hover:translate-y-0" />
                </Link>
                <div className="hidden h-4 w-px bg-border/50 sm:block" />
                <Link 
                  href="https://8tg47xoyc4.ufs.sh/f/awQXenfztGCdPEr9MeUL5apBGQlrFwm9AHuS8f40VEzkKoN6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative overflow-hidden rounded-md px-3 py-1.5 transition-all duration-300 hover:bg-primary/5 hover:text-primary"
                >
                  <span className="relative z-10 font-medium">Terms of Service</span>
                  <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-primary/10 to-transparent transition-transform duration-300 group-hover:translate-y-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
