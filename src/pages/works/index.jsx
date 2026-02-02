import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/navigation/nav";
import Transition from "@/components/layout/transition";
import PageHero from "@/components/sections/hero";
import Works from "@/features/works/works";
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

      <main className="w-auto min-h-screen bg-s">
        <PageHero
          title={[`Case Studies`]}
          subTitle="Collection of"
          src="/lab/video-3.mp4"
        />
        <Works />
      </main>
      <Footer />
    </Transition>
  );
};

export default Index;
