"use client";
import Image from "next/image";
import Globe from "@/components/magicui/globe";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import NavBarAcernity from "@/components/ui/navbarAcernity"
import { NavigationMenuDemo } from "@/components/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import Link from "next/link"

import { MenubarDemo } from "@/components/menubar-demo";
import ShimmerButton from "@/components/magicui/shimmer-button";






export default function Home() {
  return (
    <main >

      <div className="absolute inset-0 z-10 h-16 border-b-[0.5px] border-slate-700 bg-white ">
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




      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  ">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium font-bold tracking-tighter text-black dark:text-white">
          Support the projects<br /> you love<br />
          and bring them to life!
        </p>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        />
      </div>


    </main >

  );
}
