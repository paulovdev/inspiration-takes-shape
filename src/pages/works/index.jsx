import Nav from "@/components/navigation/nav";
import Hero from "@/components/section/works-components/hero";
import Works from "@/components/section/works-components/works";
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
      <main className="w-auto min-h-screen select-none">
        <Hero />
        <Works />
      </main>
    </>
  );
};

export default Index;
