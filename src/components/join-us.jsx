import Image from "next/image";
import Button from "./button";
import { FaStarOfLife } from "react-icons/fa";

const JoinUs = () => {
  return (
    <section className="relative w-screen h-screen">
      <figure className="absolute size-full overflow-hidden -z-10">
        <Image
          src="/join.jpg"
          width={3000}
          height={3000}
          alt=""
          className="size-full object-cover brightness-75"
        />
      </figure>
      <div className="absolute inset-0 p-10 flex flex-col items-center justify-center z-10 max-lg:p-5 max-md:p-2">
        <FaStarOfLife className="mb-12 text-s text-[122px] tracking-[-0.03em] leading-none text-center max-lg:text-[48px] max-md:text-[42px]" />
        <p className="max-w-100 text-s font-general font-medium text-[14px] tracking-[-0.03em] leading-[1.2] uppercase text-center">
          reliable production partner for teams adapting to the constantly
          evolving landscape of content production
        </p>
        <Button
          buttonHref="/contact"
          buttonLabel="contact us"
          buttonBgColor="#ffffff"
          buttonTextColor="#000000"
        />
      </div>
    </section>
  );
};

export default JoinUs;
