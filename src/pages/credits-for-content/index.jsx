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
            `Créditos aos colaboradores que contribuíram com fotografia, vídeo e produção de conteúdo.`,
          ]}
          subTitle="Créditos pelo conteúdo"
          src="/creative.jpg"
        />
        <ShowcaseGrid
          data={credits}
          title="09 de maio de 2024 - muito obrigado a todos <3"
          subTitle="clique para ver o perfil da pessoa"
          grid="grid-cols-1"
          gridIn="grid-cols-2"
        />
      </main>
      <Footer />
    </Transition>
  );
};

export default Index;
