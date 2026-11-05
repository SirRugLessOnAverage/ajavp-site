"use client";

import { useEffect } from "react";

export function PwaManager() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Garantir que o Service Worker é registado diretamente se o navegador suportar
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .then((registration) => {
          registration.update().catch(() => {});
        })
        .catch((error) => {
          console.debug("[PWA] Service Worker registration status:", error);
        });
    }
  }, []);

  return null;
}

