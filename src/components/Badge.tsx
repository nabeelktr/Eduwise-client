"use client";
import React from "react";
import { motion } from "framer-motion";

export const Badge = ({ text, arrow }: { text: string; arrow: boolean }) => {
  return (
    <div className="shadow-zinc-900 800px:text-md group relative mb-8 800px:mt-2 mt-4  inline-block  cursor-pointer rounded-md bg-gray-900 p-px font-Poppins text-xs font-light leading-6 tracking-wider text-white  no-underline shadow-2xl">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </span>
      <div className=" bg-zinc-950 pl-2 relative z-10 flex items-center  800px:space-x-4 px-1 uppercase ring-1 ring-white/10 800px:px-4 800px:py-2 ">
        <span>{text}</span>
        {arrow && (
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
        )}
      </div>
      <span className="from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r transition-opacity duration-500 group-hover:opacity-40"></span>
    </div>
  );
};
