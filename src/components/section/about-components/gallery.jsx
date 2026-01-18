import { motion } from "motion/react";
import { gallery } from "./about.data";
import Image from "next/image";

const CardGrid = ({ gallery }) => {
  return (
    <>
      <motion.div className="relative group">
        <figure className="h-[75vh] overflow-hidden max-lg:h-[50vh]">
          {gallery.src.includes(".mp4") ? (
            <video
              src={gallery.src}
              autoPlay
              muted
              loop
              playsInline
              className="size-full object-cover brightness-50"
            />
          ) : (
            <Image
              src={gallery.src}
              width={2000}
              height={2000}
              alt={gallery.alt}
              className="size-full object-cover brightness-50"
            />
          )}
          <div className="absolute inset-0 p-5 w-full flex flex-col items-start justify-between">
            <div className="h-[15px] overflow-hidden cursor-default">
              <p className="text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase">
                {gallery.style}
              </p>
            </div>
            <p className="min-h-20 text-s font-general text-[14px] leading-[1.2] tracking-[0.03em] uppercase">
              {gallery.description}
            </p>
          </div>
        </figure>
      </motion.div>
    </>
  );
};

const Gallery = () => {
  return (
    <section className="relative bg-s w-screen h-full overflow-hidden">
      <div className="p-10 grid grid-cols-3 gap-2 max-lg:grid-cols-2 max-md:grid-cols-1 max-lg:p-5 max-md:p-2">
        {gallery.map((gallery, i) => (
          <CardGrid key={i} gallery={gallery} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
