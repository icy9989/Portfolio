"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface MilestoneRevealProps {
  children: ReactNode;
}

export function MilestoneReveal({ children }: MilestoneRevealProps) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.reveal = "visible";
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    const reveal = () => {
      if (preference.matches) {
        element.dataset.reveal = "visible";
        observer.disconnect();
      }
    };

    if (!preference.matches) {
      element.dataset.reveal = "pending";
      observer.observe(element);
    }
    preference.addEventListener("change", reveal);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", reveal);
    };
  }, []);

  return <li ref={ref} className="milestone-row relative min-w-0 pl-14 lg:grid lg:grid-cols-2 lg:gap-20 lg:pl-0">{children}</li>;
}
