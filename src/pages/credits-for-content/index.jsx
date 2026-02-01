import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/navigation/nav";
import Transition from "@/components/layout/transition";
import PageHero from "@/components/sections/hero";
import ShowcaseGrid from "@/components/sections/showcase-grid";
import { credits } from "@/data/credits.data";
import Lenis from "lenis";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });
  }, []);

  return (
    <Transition>
      <Nav />

      <main className="w-auto min-h-screen bg-s border-b border-p/10">
        <PageHero
          title={[
            `Credits for the collaborators who contributed to photography, video, and content production.`,
          ]}
          subTitle="Credits for Content"
          src="/creative.jpg"
        />
        <ShowcaseGrid
          data={credits}
          title="09 may 2024 - thank all <3"
          subTitle="click to see"
          grid="grid-cols-1"
          gridIn="grid-cols-2"
        />
      </main>
      <Footer />
    </Transition>
  );
};

export default Index;
