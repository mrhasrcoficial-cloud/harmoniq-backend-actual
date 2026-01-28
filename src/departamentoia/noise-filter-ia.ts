// backend/src/departamentoia/noise-filter-ia.ts
// -------------------------------------------------------------
//  NoiseFilter-IA — Filtro superficial constitucional
//  Versión 1.4.1 (Alineado con MIA SUCIA v1.0)
// -------------------------------------------------------------
//  Funciones:
//    - Remover notas fantasma
//    - Remover notas demasiado cortas
//    - Remover notas fuera de rango
//    - Remover duplicados
//    - Etiquetado superficial ARKLIM
//    - NO usa cognición, intención, energía ni análisis profundo
// -------------------------------------------------------------

import type {
  BackendMidiNote,
  MiaSuciaNote,
  MiaNotaRol
} from "../dev/types/backend.types.js";

// -------------------------------------------------------------
//  Diccionario superficial ARKLIM
// -------------------------------------------------------------
const IA_DICTIONARY = {
  tags: {
    SHORT: "ARK-SHORT",
    GHOST: "ARK-GHOST",
    LOW_VELOCITY: "ARK-LOWVEL",
    DUPLICATE: "ARK-DUP",
    OUT_OF_RANGE: "ARK-OOR",
    CLEAN: "ARK-CLEAN"
  }
};

// -------------------------------------------------------------
//  Configuración del filtro
// -------------------------------------------------------------
export interface NoiseFilterConfig {
  minDuration: number;
  minVelocity: number;
  minPitch: number;
  maxPitch: number;
}

export const DEFAULT_NOISE_FILTER_CONFIG: NoiseFilterConfig = {
  minDuration: 0.05,
  minVelocity: 20,
  minPitch: 20,
  maxPitch: 115
};

// -------------------------------------------------------------
//  FUNCIÓN PRINCIPAL
// -------------------------------------------------------------
export function noiseFilterIA(
  notes: BackendMidiNote[],
  config: NoiseFilterConfig = DEFAULT_NOISE_FILTER_CONFIG
): MiaSuciaNote[] {
  const result: MiaSuciaNote[] = [];
  const seen = new Set<string>();

  for (const n of notes) {
    const tags: string[] = [];
    let valid = true;

    // Rango permitido
    if (n.pitch < config.minPitch || n.pitch > config.maxPitch) {
      tags.push(IA_DICTIONARY.tags.OUT_OF_RANGE);
      valid = false;
    }

    // Duración mínima
    if (n.duration < config.minDuration) {
      tags.push(IA_DICTIONARY.tags.SHORT);
      valid = false;
    }

    // Velocidad mínima
    if (n.velocity < config.minVelocity) {
      tags.push(IA_DICTIONARY.tags.LOW_VELOCITY);
      valid = false;
    }

    // Duplicados
    const key = `${n.pitch}-${n.startTime.toFixed(4)}`;
    if (seen.has(key)) {
      tags.push(IA_DICTIONARY.tags.DUPLICATE);
      valid = false;
    } else {
      seen.add(key);
    }

    if (valid) {
      tags.push(IA_DICTIONARY.tags.CLEAN);
    }

    // Rol superficial
    const role: MiaNotaRol = valid ? inferRole(n) : "ruido";

    // Construcción soberana MiaSuciaNote
    result.push({
      ...n,
      role,
      inScale: role !== "ruido",
      valid,
      tags
    });
  }

  return result;
}

// -------------------------------------------------------------
//  Inferencia superficial del rol (NO cognitiva)
// -------------------------------------------------------------
function inferRole(n: BackendMidiNote): MiaNotaRol {
  const pc = n.pitchClass;

  // ⭐ Corrección crítica: OR lógicos restaurados
  if (pc === 0 || pc === 5 || pc === 7) return "base";

  if (n.pitch >= 40 && n.pitch <= 90) return "acompanamiento";

  return "ruido";
}