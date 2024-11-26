"use client";
import React from "react";
import HighlightedProjectsList from "@/components/HighlightedProjectsList";
import DotPatternAndTitle from "@/components/DotPattern-title";
import NewProjectsList from "@/components/NewProjectsList";
import { useRouter } from 'next/navigation'

import PageFrame from "@/components/PageFrame";
import ProjectFilterTable from "@/components/ProjectsFIlterTable";


export default function Home() {

  const router = useRouter()



  return (
    <main>

      <PageFrame>

        <DotPatternAndTitle />

        <HighlightedProjectsList />

        <NewProjectsList />

        <ProjectFilterTable />

      </PageFrame>

    </main>
  );
}
