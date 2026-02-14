// backend/src/departamentoia/noise-filter-ia.ts
// -------------------------------------------------------------
//  NoiseFilter-IA — Etiquetador superficial constitucional
//  Versión 2.2 (NO elimina, NO transforma, NO produce MiaSuciaNote)
//  Alineado a SUPREMO: NO asigna roles soberanos
// -------------------------------------------------------------

import type { InternalMidiNote } from "../dev/types/backend.types.js";

const IA_DICTIONARY = {
  tags: {
    SHORT: "ARK-SHORT",
    GHOST: "ARK-GHOST",
    LOW_VELOCITY: "ARK-LOWVEL",
    DUPLICATE: "ARK-DUP",
    MICRO_DUP: "ARK-MICRODUP",
    OUT_OF_RANGE: "ARK-OOR",
    INVASIVE: "ARK-INV",
    CLEAN: "ARK-CLEAN"
  }
};

export interface NoiseFilterConfig {
  minDuration: number;
  minVelocity: number;
  minPitch: number;
  maxPitch: number;
}

export const DEFAULT_NOISE_FILTER_CONFIG: NoiseFilterConfig = {
  minDuration: 0.03,
  minVelocity: 12,
  minPitch: 15,
  maxPitch: 120
};

// ⭐ Devuelve InternalMidiNote enriquecido, NO MiaSuciaNote, NO role
export function noiseFilterIA(
  notes: InternalMidiNote[],
  config: NoiseFilterConfig = DEFAULT_NOISE_FILTER_CONFIG
): (InternalMidiNote & {
  valid: boolean;
  tags: string[];
})[] {
  const result = [];
  const seen = new Set<string>();

  for (const n of notes) {
    const tags: string[] = [];
    let valid = true;

    // 0) Notas fantasma
    if (n.duration <= 0 || n.velocity <= 0) {
      tags.push(IA_DICTIONARY.tags.GHOST);
      valid = false;
    }

    // 1) Rango suave
    if (n.pitch < config.minPitch || n.pitch > config.maxPitch) {
      tags.push(IA_DICTIONARY.tags.OUT_OF_RANGE);
      valid = false;
    }

    // 2) Duración mínima suave
    if (n.duration < config.minDuration) {
      tags.push(IA_DICTIONARY.tags.SHORT);
      valid = false;
    }

    // 3) Velocidad mínima suave
    if (n.velocity < config.minVelocity) {
      tags.push(IA_DICTIONARY.tags.LOW_VELOCITY);
      valid = false;
    }

    // 4) Notas invasivas
    if (n.pitch > 100 && n.velocity < 20) {
      tags.push(IA_DICTIONARY.tags.INVASIVE);
      valid = false;
    }

    // 5) Duplicados exactos
    const key = `${n.pitch}-${n.startTime.toFixed(4)}`;
    if (seen.has(key)) {
      tags.push(IA_DICTIONARY.tags.DUPLICATE);
      valid = false;
    } else {
      seen.add(key);
    }

    // 6) Micro-duplicados
    const microKey = `${n.pitch}-${(n.startTime * 1000).toFixed(0)}`;
    if (seen.has(microKey)) {
      tags.push(IA_DICTIONARY.tags.MICRO_DUP);
      valid = false;
    } else {
      seen.add(microKey);
    }

    // 7) Nota limpia
    if (valid) {
      tags.push(IA_DICTIONARY.tags.CLEAN);
    }

    result.push({
      ...n,
      valid,
      tags
    });
  }

  return result;
}