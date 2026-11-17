"use client";

import React from "react";
import { abrirDefinicoesCookies } from "./CookieConsentBanner";

interface CookieSettingsButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function CookieSettingsButton({
  className = "hover:text-emerald-300 transition-colors cursor-pointer text-left",
  children,
}: CookieSettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={abrirDefinicoesCookies}
      className={className}
    >
      {children || "Gerir Cookies"}
    </button>
  );
}
