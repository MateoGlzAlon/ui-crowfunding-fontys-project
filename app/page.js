"use client";
import Image from "next/image";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import SparklesText from "@/components/magicui/sparkles-text";
import { BentoDemo } from "@/components/BentoGridDemo";








export default function Home() {
  return (
    <main >

      <div className="absolute inset-0 z-10 h-16 border-b-[0.5px] border-slate-300 bg-white ">
        <div className="absolute left-4 transform align-middle">



        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/logo.svg" alt="logo" width={60} height={60} />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4 align-middle ">
          <button className="shadow-[inset_0_0_0_2px_#616467] text-black text-sm px-6 py-2 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration- h-10 w-40">
            Register
          </button>

          <button className="shadow-[inset_0_0_0_2px_#616467] text-white text-sm px-6 py-2 rounded-full tracking-widest uppercase font-bold bg-black hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200 h-10 w-40">
            Log in
          </button>
        </div>
      </div>




      <div className="relative flex h-[500px] flex-col items-center justify-center overflow-hidden  ">
        <div className="z-10 whitespace-pre-wrap text-center text-5xl font-bold tracking-tighter text-black dark:text-white bg-white rounded-full px-5 py-5    from-white">
          <span className="text-lg bg-black ">


            <SparklesText
              text={`Bring your favourite\nprojects to life`}
              colors={{ first: '#2a44f8', second: '#ffff00' }}
              sparklesCount={8}

            />
          </span>
        </div>
      </div>

      <div className="absolute inset-0">
        <DotPattern
          width={30}
          height={30}
          cr={2}
          className={cn(
            "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)] -z-10 -top-[13  0px]",
          )}
        />
      </div>

      <div className="mx-20 mb-10 bg-white">
        <BentoDemo />
      </div>


    </main >

  );
}
