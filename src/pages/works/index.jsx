import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/navigation/nav";
import Transition from "@/components/layout/transition";
import PageHero from "@/components/sections/hero";
import Works from "@/features/works/works";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

const Index = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <Transition lenis={lenisRef}>
      <Nav />

      <main className="w-auto min-h-screen bg-s">
        <PageHero
          title={[`Works`]}
          subTitle="Collection of our"
          src="/works/bg.jpg"
        />
        <Works />
      </main>
      <Footer />
    </Transition>
  );
};

export default Index;
