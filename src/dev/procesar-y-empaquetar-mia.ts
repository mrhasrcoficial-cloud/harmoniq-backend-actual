// backend/src/dev/procesar-y-empaquetar-mia.ts
// -------------------------------------------------------------
//  PROCESAR + EMPAQUETAR MIA SUCIA — Constitución 2.2
//  (Clasificación soberana: IA → capas → tramos → cubo → contrato)
// -------------------------------------------------------------

import { ingestMidi } from "./midi-ingestor.js";
import { IAOrchestrator } from "../departamentoia/IAOrchestrator.js";

import { adaptarCapasATramos } from "../backend-adaptadores-tramos/adaptador-tramos.js";
import { construirMiaSucia } from "./constructor-mia-sucia.js";
import { empaquetarMiaSucia } from "./empaquetador-mia-sucia.js";

import type {
  MiaSucia,
  ContractMidiNote
} from "../contracts/mia-sucia.contract.js";

import type {
  InternalMidiNote
} from "../dev/types/backend.types.js";

import { validarMiaSucia } from "./validar-mia-sucia.js";
import { generarAnalisisMusical } from "./analisis-musical.js";

export async function procesarYEmpaquetarMia(
  midiBuffer: Uint8Array | ArrayBuffer,
  outputPath?: string
): Promise<MiaSucia & { analisisMusical: any }> {

  // -------------------------------------------------------------
  // 1. Ingestar MIDI físico (tipos internos)
  // -------------------------------------------------------------
  const {
    notes,
    bpm,
    ppq,
    duracion
  }: {
    notes: InternalMidiNote[];
    bpm: number;
    ppq: number;
    duracion: number;
  } = ingestMidi(midiBuffer);

  // -------------------------------------------------------------
  // 2. Pipeline IA constitucional (notas → capas soberanas)
  // -------------------------------------------------------------
  const ia = new IAOrchestrator();
  const capasNotas = ia.run(notes); // MiaSuciaCapas

  // -------------------------------------------------------------
  // 2.1 Agrupar notas reales por capa usando el rol asignado por IA
  // -------------------------------------------------------------
  const notasPorCapa = {
    BASE: capasNotas.BASE,
    ACOMPANAMIENTO: capasNotas.ACOMPANAMIENTO,
    RUIDO: capasNotas.RUIDO
  };

  // -------------------------------------------------------------
  // 3. Adaptar capas → TRAMOS reales (vista geográfica)
  // -------------------------------------------------------------
  const capasConTramos = adaptarCapasATramos(capasNotas);

  // -------------------------------------------------------------
  // 4. Construir cubo soberano (con TRAMOS)
  // -------------------------------------------------------------
  const cubo = construirMiaSucia(capasConTramos);

  // -------------------------------------------------------------
  // 4.1 Mapear notas internas → contrato soberano
  //     (Usamos las notas YA CLASIFICADAS por IA)
  // -------------------------------------------------------------
  const notasOriginales: ContractMidiNote[] =
    [...capasNotas.BASE, ...capasNotas.ACOMPANAMIENTO, ...capasNotas.RUIDO]
      .map(n => ({
        pitch: n.pitch,
        startTime: n.startTime,
        duration: n.duration,
        velocity: n.velocity,
        trackIndex: n.trackIndex,
        channel: n.channel,
        role: n.role // ✔ ahora sí existe (MiaSuciaNote)
      }));

  // -------------------------------------------------------------
  // 5. Construir contrato final MiaSucia 1.0
  // -------------------------------------------------------------
  const mia: MiaSucia = {
    version: "1.0",
    bpmDetectado: bpm,
    ppq,
    duracion,
    totalNotas: notasOriginales.length,
    totalTramos:
      cubo.capas.BASE.tramos.length +
      cubo.capas.ACOMPANAMIENTO.tramos.length +
      cubo.capas.RUIDO.tramos.length,

    cubo,
    notasOriginales,
    notasPorCapa
  };

  // -------------------------------------------------------------
  // 6. Análisis musical clásico (CAMINO B)
  // -------------------------------------------------------------
  const analisisMusical = generarAnalisisMusical(mia);

  // -------------------------------------------------------------
  // 7. Validar contrato soberano
  // -------------------------------------------------------------
  validarMiaSucia(mia);

  // -------------------------------------------------------------
  // 8. Empaquetado opcional
  // -------------------------------------------------------------
  if (outputPath) {
    empaquetarMiaSucia(mia, outputPath);
  }

  // -------------------------------------------------------------
  // 9. Devolver contrato soberano + análisis musical
  // -------------------------------------------------------------
  return {
    ...mia,
    analisisMusical
  };
}