import Nav from "@/components/navigation/nav";
import Hero from "@/components/hero/hero";
import Works from "@/components/section/works-components/works";
import Lenis from "lenis";

import { useEffect } from "react";
import Footer from "@/components/footer/footer";
import Transition from "@/components/transition";
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

      <main className="w-auto min-h-screen bg-s select-none">
        <Hero
          title="Case Studies"
          subTitle="Collection of"
          src="/works/video-6.mp4"
        />
        <Works />
      </main>
      <Footer />
    </Transition>
  );
};

export default Index;
