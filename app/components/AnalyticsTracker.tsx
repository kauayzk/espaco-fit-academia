"use client";

import { useEffect } from "react";

export function AnalyticsTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null;
      if (!element) return;
      const params = new URLSearchParams(window.location.search);
      const referrer = document.referrer.toLowerCase();
      const source = params.get("utm_source") || (referrer.includes("instagram") ? "instagram" : referrer.includes("google") ? "google" : referrer ? "referência" : "direto");
      void fetch("/api/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          event: "cta_click",
          path: window.location.pathname,
          source,
          metadata: { label: element.dataset.track ?? "cta" },
        }),
        keepalive: true,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
