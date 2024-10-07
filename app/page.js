"use client";
import React, { useState } from "react";
import HighlightedProjectsList from "@/components/HighlightedProjectsList";
import Navbar from "@/components/Navbar";
import DotPatternAndTitle from "@/components/DotPattern-title";
import NewProjectsList from "@/components/NewProjectsList";
import axios from "axios";
import AxiomDemo from "@/components/AxiomDemo";

export default function Home() {
  const [userData, setUserData] = useState(null);



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
