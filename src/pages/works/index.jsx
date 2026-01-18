import Nav from "@/components/navigation/nav";
import Credits from "@/components/section/credits-for-content-components/credits";
import Hero from "@/components/section/works-components/hero";
import Works from "@/components/section/works-components/works";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

const Index = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 0.5,
      smooth: true,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />
      <main className="w-auto min-h-screen select-none">
        <Hero />
        <Works />
      </main>
    </>
  );
};

export default Index;
