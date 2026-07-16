"use client";

import Link from "next/link";

const GetStarted = () => {
  return (
    <Link
      href="https://kyronmedical.com/contact"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#577DE8] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]"
      aria-label="Request a Demo button"
      role="button"
      data-oid="jjlnk-4"
    >
      Request a Demo
    </Link>
  );
};

export default GetStarted;
