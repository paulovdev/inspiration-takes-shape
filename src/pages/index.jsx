import About from "@/components/section/home-components/about";
import Hero from "@/components/section/home-components/hero";
import Reel from "@/components/section/home-components/reel";
import Nav from "@/components/navigation/nav";
import Lenis from "lenis";
import Works from "@/components/section/home-components/works";
import Clients from "@/components/section/home-components/clients";
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
      <main className="w-auto min-h-screen ">
        <div className="bg-p">
          <Hero />
          <About />
          <Works />
        </div>
        <div className="bg-brd">
          <Clients />
          <Reel />
        </div>
      </main>
    </>
  );
};

export default Index;
