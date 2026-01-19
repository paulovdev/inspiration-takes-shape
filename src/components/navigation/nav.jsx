import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Menu } from "@/components/navigation/menu";
import { useRouter } from "next/router";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="fixed top-0 right-0 px-10 pt-10 w-full flex items-center justify-between z-100 mix-blend-exclusion max-lg:px-5 max-lg:pt-5">
        {router.pathname === "/" ? (
          <div></div>
        ) : (
          <button
            onClick={() => router.back()}
            scroll={false}
            className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px]"
          >
            back
          </button>
        )}
        <button
          className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-md:text-[12px]"
          onClick={() => setMenu(true)}
        >
          menu
        </button>
      </nav>

      <AnimatePresence mode="wait">
        {menu && <Menu setMenu={setMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Nav;
