import "@/styles/globals.css";
import { AnimatePresence } from "motion/react";
import Head from "next/head";

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>INSPIRATION TAKES SHAPE®</title>
      </Head>

      <div className="main">
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </div>
    </>
  );
}
