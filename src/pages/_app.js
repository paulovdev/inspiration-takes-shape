import "@/styles/globals.css";
import { AnimatePresence, motion } from "motion/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const pathname = router.asPath;

  return (
    <>
      <Head>
        <title>INSPIRATION TAKES SHAPE®</title>
      </Head>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
