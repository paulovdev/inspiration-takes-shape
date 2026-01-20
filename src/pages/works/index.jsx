import Nav from "@/components/navigation/nav";
import Hero from "@/components/hero/hero";
import Works from "@/components/section/works-components/works";
import Lenis from "lenis";

import { useEffect } from "react";
const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
  }, []);
  return (
    <>
      <Nav />

      <main className="w-auto min-h-screen select-none">
        <Hero
          title="Case Studies"
          subTitle="Collection of"
          src="/works/video-6.mp4"
        />
        <Works />
      </main>
    </>
  );
};

export default Index;
