"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BentoDemo } from "@/components/BentoGridDemo";
import HighlightedProjectsList from "@/components/HighlightedProjectsList";

import Navbar from "@/components/Navbar";
import DotPatternAndTitle from "@/components/DotPattern-title";


export default function Home() {
  return (
    <main >

      <Navbar />

      <DotPatternAndTitle />

      <HighlightedProjectsList />




    </main >

  );
}
