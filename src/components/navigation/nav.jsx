import { useState } from "react";
import { AnimatePresence } from "motion/react";

import { Menu } from "@/components/navigation/menu";

const Nav = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <nav className="fixed top-0 right-0 px-10 pt-10 z-100 mix-blend-exclusion max-lg:px-5 max-lg:pt-3">
        <button
          className="text-s font-general text-[14px] leading-none tracking-[0.03em] uppercase max-xsm:text-[12px]"
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
