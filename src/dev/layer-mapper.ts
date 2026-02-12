// -------------------------------------------------------------
//  LayerMapper — Versión Constitucional 3.0
//  Reconstrucción soberana de BASE / ACOMP / RUIDO
// -------------------------------------------------------------

import type { MiaSuciaNote, MiaSuciaCapas } from "../dev/types/backend.types.js";

// -------------------------------------------------------------
//  1. BASE — notas fundamentales (root notes)
// -------------------------------------------------------------
function esNotaBase(n: MiaSuciaNote, todas: MiaSuciaNote[]): boolean {
  const pitches = todas.map(x => x.pitch);
  const minPitch = Math.min(...pitches);

  // Notas más graves → base
  if (n.pitch <= minPitch + 5) return true;

  // Repetición cíclica → base
  const repeticiones = todas.filter(x => x.pitch === n.pitch).length;
  if (repeticiones >= 3) return true;

  return false;
}

// -------------------------------------------------------------
//  2. ACOMPANAMIENTO — notas de acordes / armonía
// -------------------------------------------------------------
function esAcompanamiento(n: MiaSuciaNote, todas: MiaSuciaNote[]): boolean {
  const pitches = todas.map(x => x.pitch);
  const minPitch = Math.min(...pitches);
  const maxPitch = Math.max(...pitches);

  // Rango medio → acompañamiento
  if (n.pitch > minPitch + 5 && n.pitch < maxPitch - 5) return true;

  return false;
}

// -------------------------------------------------------------
//  3. RUIDO — micro-notas, aisladas, fuera de escala
// -------------------------------------------------------------
function esRuido(n: MiaSuciaNote, todas: MiaSuciaNote[]): boolean {
  // micro-notas
  if (n.duration < 0.02) return true;

  // velocity muy baja
  if (n.velocity < 10) return true;

  // pitch fuera de rango musical
  if (n.pitch < 15 || n.pitch > 120) return true;

  // nota aislada (ventana contextual ampliada)
  const vecinos = todas.filter(
    m =>
      m !== n &&
      Math.abs(m.startTime - n.startTime) < 1.0 &&   // ⭐ ventana ampliada
      Math.abs(m.pitch - n.pitch) < 4
  );

  if (vecinos.length === 0) return true;

  return false;
}

// -------------------------------------------------------------
//  Ministerio de Capas — Función oficial
// -------------------------------------------------------------
export function layerMapper(notes: MiaSuciaNote[]): MiaSuciaCapas {
  const BASE: MiaSuciaNote[] = [];
  const ACOMPANAMIENTO: MiaSuciaNote[] = [];
  const RUIDO: MiaSuciaNote[] = [];

  for (const n of notes) {
    // 1) Ruido físico o contextual
    if (esRuido(n, notes)) {
      RUIDO.push(n);
      continue;
    }

    // 2) Notas fundamentales
    if (esNotaBase(n, notes)) {
      BASE.push(n);
      continue;
    }

    // 3) Notas de acompañamiento
    if (esAcompanamiento(n, notes)) {
      ACOMPANAMIENTO.push(n);
      continue;
    }

    // 4) Fallback seguro → acompañamiento
    ACOMPANAMIENTO.push(n);
  }

  return { BASE, ACOMPANAMIENTO, RUIDO };
}