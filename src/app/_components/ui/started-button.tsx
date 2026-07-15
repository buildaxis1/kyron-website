"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const GetStarted = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => console.log("hover started!")}
      data-oid="ln6635n"
    >
      <Link
        href="https://kyronmedical.com/contact"
        rel="noopener noreferrer"
        className="whitespace-nowrap rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.12),4px_0_6px_-1px_rgba(0,0,0,0.3)] hover:bg-blue-800 sm:px-6 sm:text-base"
        aria-label="Request a Demo button"
        role="button"
        data-oid="jjlnk-4"
      >
        Request a Demo
      </Link>
    </motion.div>
  );
};

export default GetStarted;
