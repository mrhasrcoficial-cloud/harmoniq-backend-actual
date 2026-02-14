// -------------------------------------------------------------
//  CONTRATO MIA SUCIA — Versión 1.0 (Alineado a SUPREMO 2.2)
//  Fuente soberana para SRC → SUPREMO → CRUZ → ARKLIM
// -------------------------------------------------------------

import type { MiaCubo } from "../dev/types/mia.types.js";

// -------------------------------------------------------------
//  Notas reales del MIDI físico (salida directa de ingestMidi)
//  + rol soberano asignado por IA-MIA
// -------------------------------------------------------------
export interface ContractMidiNote {
  pitch: number;
  startTime: number;
  duration: number;
  velocity: number;
  trackIndex: number;
  channel: number;

  /** Rol soberano asignado por IA-MIA */
  role: "BASE" | "ACOMPANAMIENTO" | "RUIDO";
}

// -------------------------------------------------------------
//  CONTRATO MIA SUCIA (Versión 1.0)
//  La verdad oficial del sistema
// -------------------------------------------------------------
export interface MiaSucia {
  /** Versión del contrato */
  version: "1.0";

  /** Cubo geográfico MIA SUCIA v1.0 (vista por tramos) */
  cubo: MiaCubo;

  /** Metadata física mínima requerida por SUPREMO */
  bpmDetectado: number;
  ppq: number;
  duracion: number;

  /** Totales opcionales */
  totalNotas?: number;
  totalTramos?: number;

  /** ⭐ Notas reales del MIDI físico (sin alterar) */
  notasOriginales: ContractMidiNote[];

  /** ⭐ Notas reales clasificadas por capa (agrupación directa) */
  notasPorCapa: {
    BASE: ContractMidiNote[];
    ACOMPANAMIENTO: ContractMidiNote[];
    RUIDO: ContractMidiNote[];
  };
}

// -------------------------------------------------------------
//  ADAPTADOR: PMSmiaTramo → MidiNote (solo para vistas geográficas)
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
      2
  };
}