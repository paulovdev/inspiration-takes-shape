import Nav from "@/components/layout/navigation/nav";
import Transition from "@/components/layout/transition";

import Hero from "@/features/home/hero";

const Index = () => {
  return (
    <Transition>
      <Nav />
      <main className="min-h-screen ">
        <Hero />
      </main>
    </Transition>
  );
};

export default Index;
