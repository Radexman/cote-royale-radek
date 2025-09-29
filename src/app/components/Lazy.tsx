"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";

type LazyProps = ComponentProps<"div"> & {
  rootMargin?: string;
};

export const Lazy = ({ rootMargin, children, ...rest }: LazyProps) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0, rootMargin },
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [rootMargin]);

  return (
    <div ref={ref} {...rest}>
      {isInView ? children : null}
    </div>
  );
};
