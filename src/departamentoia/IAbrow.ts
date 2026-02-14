// backend/src/departamentoia/IAbrow.ts
// -------------------------------------------------------------
//  IAbrow — IA‑MIA (Clasificación superficial con evaluación)
//  Constitución 2.2 — Tipos internos correctos
// -------------------------------------------------------------

import type {
  MiaSuciaNote,
  MiaNotaRol,
  MiaSuciaCapas
} from "../dev/types/backend.types.js";

import type { NotaEvaluada } from "./IAEvaluator.js";

// -------------------------------------------------------------
//  Clase IA — Clasificación superficial basada en evaluación
// -------------------------------------------------------------
export class IAbrow {

  private clasificarNota(n: NotaEvaluada): MiaNotaRol {
    const tipo = n.tipo;
    const est = n.estabilidad;
    const imp = n.importancia;

    if (tipo === "fantasma" || tipo === "micro") return "RUIDO";
    if (tipo === "aislada" && imp < 0.25) return "RUIDO";

    if (tipo === "estructural" && est >= 0.8 && imp >= 0.4) return "BASE";
    if (tipo === "guia" && est >= 0.7 && imp >= 0.5) return "BASE";

    if (tipo === "paso") return "ACOMPANAMIENTO";
    if (tipo === "relleno") return "ACOMPANAMIENTO";
    if (tipo === "tension") return "ACOMPANAMIENTO";
    if (tipo === "resolucion") return "ACOMPANAMIENTO";

    if (imp >= 0.2) return "ACOMPANAMIENTO";

    return "RUIDO";
  }

  // ⭐ Recibe NotaEvaluada[], NO InternalMidiNote[]
  private etiquetar(notes: NotaEvaluada[]): MiaSuciaNote[] {
    return notes.map<MiaSuciaNote>(n => {
      const role = this.clasificarNota(n);

      return {
        ...n, // incluye id, pitch, startTime, duration, velocity, pitchClass, channel
        role,
        inScale: role !== "RUIDO",
        valid: role !== "RUIDO",
        tags: [n.tipo]
      };
    });
  }

  public procesar(notes: NotaEvaluada[]): MiaSuciaNote[] {
    return this.etiquetar(notes);
  }
}

// -------------------------------------------------------------
//  API oficial: clasificar notas superficialmente
// -------------------------------------------------------------
export function IAbrow_clasificarNotas(
  notes: NotaEvaluada[]
): MiaSuciaNote[] {
  const ia = new IAbrow();
  return ia.procesar(notes);
}

// -------------------------------------------------------------
//  API oficial: clasificar capas
// -------------------------------------------------------------
export function IAbrow_clasificarCapas(
  notes: MiaSuciaNote[]
): MiaSuciaCapas {
  return {
    BASE: notes.filter(n => n.role === "BASE"),
    ACOMPANAMIENTO: notes.filter(n => n.role === "ACOMPANAMIENTO"),
    RUIDO: notes.filter(n => n.role === "RUIDO")
  };
}