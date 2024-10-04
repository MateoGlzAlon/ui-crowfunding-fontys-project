"use client";
import React, { useState } from "react";
import HighlightedProjectsList from "@/components/HighlightedProjectsList";
import Navbar from "@/components/Navbar";
import DotPatternAndTitle from "@/components/DotPattern-title";
import NewProjectsList from "@/components/NewProjectsList";


export default function Home() {
  return (
    <main >

      <Navbar />

      <DotPatternAndTitle />

      <HighlightedProjectsList />

      <NewProjectsList />









    </main >

  );
}
