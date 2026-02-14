// ============================================================
//  backend/src/dev/types/backend.types.ts
//  Tipos oficiales del país Backend (Constitución 2.2)
//  Alineado al contrato SUPREMO y al backend real
// ============================================================

// ─────────────────────────────────────────────
// 1. Nota MIDI cruda (ingesta física interna)
// ─────────────────────────────────────────────
export interface InternalMidiNote {
  id: string;
  trackIndex: number;
  pitch: number;
  startTime: number;
  duration: number;
  velocity: number;
  pitchClass: number;

  // ⭐ channel sí existe en la arquitectura 2.0
  channel: number;
}

// ─────────────────────────────────────────────
// 2. Rol superficial IA‑MIA (SOBERANO interno)
// ─────────────────────────────────────────────
export type MiaNotaRol =
  | "BASE"
  | "ACOMPANAMIENTO"
  | "RUIDO";

// ─────────────────────────────────────────────
// 3. Nota MIA SUCIA (clasificada superficialmente)
// ─────────────────────────────────────────────
export interface MiaSuciaNote extends InternalMidiNote {
  role: MiaNotaRol;
  tags: string[];
  inScale: boolean;
  valid: boolean;

  // ⭐ Campos internos del pipeline IA (opcionales)
  tipo?: string;
  estabilidad?: number;
  importancia?: number;
  vecinos?: number;
}

// ─────────────────────────────────────────────
// 4. Capas superficiales previas al cubo
// ─────────────────────────────────────────────
export interface MiaSuciaCapas {
  BASE: MiaSuciaNote[];
  ACOMPANAMIENTO: MiaSuciaNote[];
  RUIDO: MiaSuciaNote[];
}