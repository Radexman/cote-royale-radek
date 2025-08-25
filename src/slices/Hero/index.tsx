import clsx from "clsx";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import Bounded from "@/app/components/Bounded";
import FadeIn from "@/app/components/FadeIn";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        vars={{ scale: 1, opacity: 0.5 }}
        className="absolute inset-0 scale-125 opacity-0"
      >
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          priority
          fill
          className="object-cover"
        />
      </FadeIn>
      <div className="relative flex h-screen flex-col justify-center">
        <div className="font-display max-w-xl text-6xl leading-tight text-neutral-50 md:text-7xl lg:text-8xl">
          <PrismicRichText field={slice.primary.heading} />
        </div>
        <FadeIn
          vars={{ delay: 1, duration: 0.3 }}
          className="mt-6 max-w-md translate-y-8 text-lg text-neutral-100"
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>
        <FadeIn
          vars={{ delay: 1.7, duration: 1.1 }}
          className="mt-8 translate-y-5"
        >
          {slice.primary.button.map((link) => (
            <PrismicNextLink
              key={link.key}
              field={link}
              className={clsx(
                "inline-flex items-center justify-center px-12 py-4 text-center font-extrabold tracking-wider uppercase transition-colors duration-300",
                link.variant === "Secondary"
                  ? "border border-white text-white hover:bg-white/20"
                  : "text-balck hover:bg-white-80 bg-white",
                "w-fit",
              )}
            />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;
