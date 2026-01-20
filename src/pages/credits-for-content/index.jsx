import { useEffect } from "react";
import Lenis from "lenis";

import Nav from "@/components/navigation/nav";
import Hero from "@/components/hero/hero";

import HighlightList from "@/components/highlight/highlight-list";

import { credits } from "@/data/credits.data";

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });
  }, []);

  return (
    <>
      <Nav />

      <main className="w-auto min-h-screen select-none">
        <Hero
          title="Credits for Content"
          subTitle="09 may 2024"
          src="/works/img-13.jpg"
        />
        <HighlightList
          data={credits}
          title="Credits for the collaborators who contributed to photography, video, and content production."
          subTitle="click to see"
          grid="grid-cols-1"
          gridIn="grid-cols-2"
        />
      </main>
    </>
  );
};

export default Index;
