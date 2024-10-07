"use client";
import React from "react";
import HighlightedProjectsList from "@/components/HighlightedProjectsList";
import Navbar from "@/components/Navbar";
import DotPatternAndTitle from "@/components/DotPattern-title";
import NewProjectsList from "@/components/NewProjectsList";
import AxiomDemo from "@/components/AxiomDemo";


export default function Home() {

  return (
    <main>

      <Navbar />

      <DotPatternAndTitle />

      <HighlightedProjectsList />

      <NewProjectsList />

      <AxiomDemo />

    </main>
  );
}
