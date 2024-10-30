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
        {console.log(1)}
        <DotPatternAndTitle />
        {console.log(2)}
        <HighlightedProjectsList />
        {console.log(3)}
        <NewProjectsList />
        {console.log(4)}
      </PageFrame>
      {console.log(5)}
    </main>


  );
}
