import Nav from "@/components/layout/navigation/nav";
import Transition from "@/components/layout/transition";

import Hero from "@/features/newHome/hero";

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
      <main className="min-h-screen ">
        <Hero lenisRef={lenisRef} />
      </main>
    </Transition>
  );
};

export default Index;
