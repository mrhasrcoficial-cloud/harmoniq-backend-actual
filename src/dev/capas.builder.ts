// -------------------------------------------------------------
//  CONSTRUCTOR DE CAPAS — Constitución 1.4.1
//  Alineado a las capas soberanas:
//      BASE / ACOMPANAMIENTO / RUIDO
// -------------------------------------------------------------

import type { MiaSuciaNote, MiaSuciaCapas } from "./types/backend.types.js";

export function construirCapas(notasConRol: MiaSuciaNote[]): MiaSuciaCapas {
  return {
    BASE: notasConRol.filter(n => n.role === "base"),
    ACOMPANAMIENTO: notasConRol.filter(n => n.role === "acompanamiento"),
    RUIDO: notasConRol.filter(n => n.role === "ruido")
  };
}