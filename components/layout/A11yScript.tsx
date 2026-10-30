"use client";

import { useEffect } from "react";

export function A11yScript() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if script already in DOM
    const existingScript = document.getElementById("a11y-core-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "a11y-core-script";
      script.src = "/assets/js/a11y.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
}

