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
            `Credits to the collaborators who contributed with photography, video, and content production.`,
          ]}
          subTitle="Credits for content"
          src="/creative.jpg"
        />
        <ShowcaseGrid
          data={credits}
          title="May 9, 2024 - Thank you all so much <3"
          subTitle="Click to view the person's profile."
          grid="grid-cols-1"
          gridIn="grid-cols-2"
        />
      </main>
      <Footer />
    </Transition>
  );
};

export default Index;
