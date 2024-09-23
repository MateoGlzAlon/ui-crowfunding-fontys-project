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
          <Image src="/kuriboh.png" alt="logo" width={60} height={60} />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-4">
          <p>EY</p>

          <ShimmerButton className="shadow-md h-max" >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-black dark:text-white lg:text-lg">
              Log in
            </span>
          </ShimmerButton>

          <ShimmerButton className="shadow-md h-max" >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Register
            </span>
          </ShimmerButton>

        </div>



      </div>




      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />



      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}

        width={25}
      />

    </main >

  );
}
