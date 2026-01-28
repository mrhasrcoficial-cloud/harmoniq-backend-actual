// backend/src/contracts/mia-sucia.contract.ts
// -------------------------------------------------------------
//  CONTRATO MIA SUCIA — Versión 1.0 (Alineado a SUPREMO)
// -------------------------------------------------------------

import type { MiaCubo } from "../dev/types/mia.types.js";

// -------------------------------------------------------------
//  CONTRATO MIA SUCIA (Versión 1.0)
// -------------------------------------------------------------
export interface MiaSucia {
  /** Versión del contrato */
  version: "1.0";

  /** Cubo geográfico MIA SUCIA v1.0 (BASE / ACOMPANAMIENTO / RUIDO) */
  cubo: MiaCubo;

  /** Metadata física mínima requerida por SUPREMO */
  bpmDetectado: number;
  ppq: number;
  duracion: number;

  /** Totales opcionales */
  totalNotas?: number;
  totalTramos?: number;
}

// -------------------------------------------------------------
//  ADAPTADOR: PMSmiaTramo → MidiNote (para SRC y SUPREMO)
// -------------------------------------------------------------
export function tramoToMidiNote(t: any) {
  return {
    id: crypto.randomUUID(),
    pitch: t.altura,
    startTime: t.inicio,
    duration: t.fin - t.inicio,
    velocity: 100,
    trackIndex:
      t.capa === "BASE" ? 0 :
      t.capa === "ACOMPANAMIENTO" ? 1 :
      2,
    channel: 0
  };
}