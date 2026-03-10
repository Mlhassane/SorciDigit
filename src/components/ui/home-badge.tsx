import React from 'react';
import { motion } from 'framer-motion';

export default function HomeBadge() {
  return (
    <div className="group relative mb-2 inline-block cursor-pointer rounded-full bg-gray-200/50 p-px text-xs leading-6 font-semibold no-underline shadow-sm md:shadow-md transition-shadow">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0)_75%)] absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </span>
      <div className="ring-ring/10 relative z-10 flex items-center space-x-2 rounded-full bg-white px-4 py-1 ring-1 border border-gray-100 grotesk text-gray-600">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
          Sorci Digit Agency
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M10.75 8.75L14.25 12L10.75 15.25"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          ></motion.path>
        </svg>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-gray-400/0 via-gray-400/50 to-gray-400/0 transition-opacity duration-500 group-hover:opacity-100"></span>
    </div>
  );
}
