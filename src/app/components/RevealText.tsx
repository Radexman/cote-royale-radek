"use client";

import clsx from "clsx";
import { ElementType, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { asText, RichTextField } from "@prismicio/client";

gsap.registerPlugin(useGSAP);

type RevealTextProps = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: ElementType;
  duration?: number;
  align?: "center" | "start" | "end";
};

const RevealText = ({
  field,
  id,
  className,
  staggerAmount = 0.1,
  as: Component = "div",
  duration = 0.8,
  align = "start",
}: RevealTextProps) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const words = asText(field).split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          stagger: staggerAmount,
          duration,
          ease: "power3",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".reveal-text-word", {
          duration: 0.5,
          opacity: 1,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });
    },
    { scope: componentRef },
  );

  return (
    <Component
      className={clsx(
        "reveal-text text-balance",
        align === "center" && "text-center",
        align === "end" && "text-right",
        align === "start" && "text-left",
        className,
      )}
      ref={componentRef}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}-${id}`}
          className="mb-0 inline-block overflow-hidden pb-4"
        >
          <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};

export default RevealText;
