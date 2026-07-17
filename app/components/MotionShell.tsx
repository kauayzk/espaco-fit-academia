"use client";

import { useEffect } from "react";

export function MotionShell() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealMotions = ["up", "left", "scale", "right"];

    root.classList.add("motion-ready");
    root.classList.remove("page-leaving");
    elements.forEach((element, index) => {
      element.dataset.revealMotion = revealMotions[index % revealMotions.length];
      element.style.setProperty("--reveal-order", `${index % 4}`);
    });

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

    const handleNavigation = (event: MouseEvent) => {
      if (reducedMotion || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!target || target.target === "_blank" || target.hasAttribute("download")) return;

      const destination = new URL(target.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const sameDocument = destination.pathname === window.location.pathname && destination.search === window.location.search;
      if (sameDocument) return;

      event.preventDefault();
      root.classList.add("page-leaving");
      window.setTimeout(() => window.location.assign(destination.href), 420);
    };

    const handlePageShow = () => root.classList.remove("page-leaving");
    document.addEventListener("click", handleNavigation);
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("click", handleNavigation);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
