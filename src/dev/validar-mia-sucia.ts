// backend/src/dev/validar-mia-sucia.ts
// -------------------------------------------------------------
//  Validador MIA SUCIA — Constitución 1.4.1 (Alineado a SUPREMO)
// -------------------------------------------------------------

import type { MiaSucia } from "../contracts/mia-sucia.contract.js";

export function validarMiaSucia(obj: any): obj is MiaSucia {
  if (!obj || typeof obj !== "object") return false;

  if (obj.version !== "1.0") return false;

  if (typeof obj.bpmDetectado !== "number") return false;
  if (typeof obj.ppq !== "number") return false;
  if (typeof obj.duracion !== "number") return false;

  const cubo = obj.cubo;
  if (!cubo || typeof cubo !== "object") return false;
  if (cubo.version !== "1.0") return false;

  const capas = cubo.capas;
  if (!capas || typeof capas !== "object") return false;

  // ⭐ Nuevo idioma constitucional
  const nombres = ["BASE", "ACOMPANAMIENTO", "RUIDO"] as const;

  for (const nombre of nombres) {
    const capa = capas[nombre];
    if (!capa || typeof capa !== "object") return false;
    if (capa.nombre !== nombre) return false;
    if (!Array.isArray(capa.tramos)) return false;

    for (const t of capa.tramos) {
      if (typeof t.altura !== "string") return false;
      if (typeof t.inicio !== "number") return false;
      if (typeof t.fin !== "number") return false;
      if (typeof t.capa !== "string") return false;
    }
  }

  return true;
}