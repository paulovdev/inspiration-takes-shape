import Nav from "@/components/navigation/nav";
import About from "@/components/section/about-components/about";
import Awards from "@/components/section/about-components/awards";
import Clients from "@/components/section/about-components/clients";
import Gallery from "@/components/section/about-components/gallery";
import Hero from "@/components/section/about-components/hero";
import Lenis from "lenis";
import Link from "next/link";
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
      <Link
        href="/"
        scroll={false}
        className="fixed top-0 left-0 px-10 pt-10 uppercase z-100"
      >
        <span className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase max-xsm:text-[12px]">
          back
        </span>
      </Link>
      <main className="w-auto min-h-screen ">
        <Hero />
        <About />
        <div className="mt-20 mb-2 w-full h-px bg-p/25" />
        <Gallery />
        <Clients />
        <div className="mt-20 mb-2 w-full h-px bg-p/25" />
        <Gallery />
        <Awards />
      </main>
    </>
  );
};

export default Index;
