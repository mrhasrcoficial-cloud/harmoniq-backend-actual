// ============================================================
//  backend/src/dev/types/backend.types.ts
//  Tipos oficiales del país Backend (Constitución 1.4.1)
//  Alineado al contrato SUPREMO y al backend real
// ============================================================

// ─────────────────────────────────────────────
// 1. Nota MIDI cruda (ingesta física)
// ─────────────────────────────────────────────
export interface BackendMidiNote {
  id: string;
  trackIndex: number;
  pitch: number;
  startTime: number;
  duration: number;
  velocity: number;
  pitchClass: number;
}

// ─────────────────────────────────────────────
// 2. Rol superficial IA‑MIA
// ─────────────────────────────────────────────
export type MiaNotaRol =
  | "base"
  | "acompanamiento"
  | "ruido";

// ─────────────────────────────────────────────
// 3. Nota MIA SUCIA (clasificada superficialmente)
// ─────────────────────────────────────────────
export interface MiaSuciaNote extends BackendMidiNote {
  role: MiaNotaRol;
  tags: string[];
  inScale: boolean;
  valid: boolean;
}

// ─────────────────────────────────────────────
// 4. Capas superficiales previas al cubo
// ─────────────────────────────────────────────
export interface MiaSuciaCapas {
  BASE: MiaSuciaNote[];
  ACOMPANAMIENTO: MiaSuciaNote[];
  RUIDO: MiaSuciaNote[];
}