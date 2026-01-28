// backend/src/departamentoia/IAbrow.ts
// -------------------------------------------------------------
//  IAbrow — IA‑MIA (Clasificación superficial)
//  Versión constitucional 1.4.1
// -------------------------------------------------------------

import type {
  BackendMidiNote,
  MiaSuciaNote,
  MiaNotaRol,
  MiaSuciaCapas
} from "../dev/types/backend.types.js";

// -------------------------------------------------------------
//  Clase IA — Clasificación superficial
// -------------------------------------------------------------
export class IAbrow {

  // Regla superficial de rol
  private clasificarNota(n: BackendMidiNote): MiaNotaRol {
    const pc = n.pitchClass;

    if (n.pitch < 20 || n.pitch > 115) return "ruido";
    if (n.duration < 0.05) return "ruido";

    if (pc === 0 || pc === 5 || pc === 7) return "base";

    return "acompanamiento";
  }

  // Convertir BackendMidiNote → MiaSuciaNote
  private etiquetar(notes: BackendMidiNote[]): MiaSuciaNote[] {
    return notes.map<MiaSuciaNote>(n => {
      const role = this.clasificarNota(n);

      return {
        ...n,
        role,
        inScale: role !== "ruido",
        valid: role !== "ruido",
        tags: []
      };
    });
  }

  // API interna
  public procesar(notes: BackendMidiNote[]): MiaSuciaNote[] {
    return this.etiquetar(notes);
  }
}

// -------------------------------------------------------------
//  API oficial: clasificar notas superficialmente
// -------------------------------------------------------------
export function IAbrow_clasificarNotas(
  notes: BackendMidiNote[]
): MiaSuciaNote[] {
  const ia = new IAbrow();
  return ia.procesar(notes);
}

// -------------------------------------------------------------
//  API oficial: clasificar capas (requiere MiaSuciaNote[])
// -------------------------------------------------------------
export function IAbrow_clasificarCapas(
  notes: MiaSuciaNote[]
): MiaSuciaCapas {
  return {
    BASE: notes.filter(n => n.role === "base"),
    ACOMPANAMIENTO: notes.filter(n => n.role === "acompanamiento"),
    RUIDO: notes.filter(n => n.role === "ruido")
  };
}