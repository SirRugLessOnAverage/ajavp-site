"use client";

import React from "react";
import { AgendaMatchCenter, type AgendaMatchCenterProps } from "./AgendaMatchCenter";

/**
 * EventosSection • Centro de Jogos & Agenda Oficial AJAVP (36 provas)
 * Mantém compatibilidade integral e renderiza a nova experiência interativa AgendaMatchCenter.
 */
export function EventosSection(props: AgendaMatchCenterProps) {
  return <AgendaMatchCenter {...props} />;
}
