"use client";

import { useEffect } from "react";

export function PwaManager() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Garantir que o Service Worker é registado diretamente e força refresh único quando há atualização de versão
    if ("serviceWorker" in navigator) {
      const hadController = Boolean(navigator.serviceWorker.controller);
      let refreshing = false;
      const handleControllerChange = () => {
        if (hadController && !refreshing) {
          refreshing = true;
          window.location.reload();
        }
      };

      navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .then((registration) => {
          registration.update().catch(() => {});
        })
        .catch((error) => {
          console.debug("[PWA] Service Worker registration status:", error);
        });

      return () => {
        navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
      };
    }
  }, []);

  return null;
}

