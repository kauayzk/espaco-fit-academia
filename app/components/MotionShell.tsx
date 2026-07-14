"use client";

import { useEffect } from "react";

export function MotionShell() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const root = document.documentElement;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      elements.forEach((element) => observer.observe(element));
    }

    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(window.scrollY / maxScroll, 1);
        root.style.setProperty("--scroll-progress", progress.toString());
        root.style.setProperty("--scroll-shift", `${Math.min(window.scrollY * 0.08, 84)}px`);
        root.classList.toggle("has-scrolled", window.scrollY > 24);
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
