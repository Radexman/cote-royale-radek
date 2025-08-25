"use client";

import clsx from "clsx";
import { ReactNode, use, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type FadeInProps = {
  children: ReactNode;
  vars?: gsap.TweenVars;
  className?: string;
};

const FadeIn = ({ children, vars = {}, className }: FadeInProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.to(containerRef.current, {
        duration: 5,
        opacity: 1,
        ease: "power3",
        y: 0,
        ...vars,
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={clsx("opacity-0", className)}>
      {children}
    </div>
  );
};

export default FadeIn;
