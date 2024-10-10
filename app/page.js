"use client";
import React from "react";
import HighlightedProjectsList from "@/components/HighlightedProjectsList";
import DotPatternAndTitle from "@/components/DotPattern-title";
import NewProjectsList from "@/components/NewProjectsList";
import { useRouter } from 'next/navigation'

import PageFrame from "@/components/PageFrame";


export default function Home() {

  const router = useRouter()

  return (
    <main>

      <PageFrame>

        <DotPatternAndTitle />

        <HighlightedProjectsList />

        <NewProjectsList />

      </PageFrame>

    </main>


  );
}
