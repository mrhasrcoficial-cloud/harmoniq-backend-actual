// backend/src/dev/procesar-y-empaquetar-mia.ts
// -------------------------------------------------------------
//  PROCESAR + EMPAQUETAR MIA SUCIA — Constitución 1.4.1
// -------------------------------------------------------------

import { ingestMidi } from "./midi-ingestor.js";
import { IAOrchestrator } from "../departamentoia/IAOrchestrator.js";
import { construirMiaSucia } from "./constructor-mia-sucia.js";
import { empaquetarMiaSucia } from "./empaquetador-mia-sucia.js";

import type { MiaSucia } from "../contracts/mia-sucia.contract.js";
import { validarMiaSucia } from "./validar-mia-sucia.js";

// ⭐ Nuevo módulo CAMINO B
import { generarAnalisisMusical } from "./analisis-musical.js";

export async function procesarYEmpaquetarMia(
  midiBuffer: Uint8Array | ArrayBuffer,
  outputPath?: string
): Promise<MiaSucia & { analisisMusical: any }> {

  // 1. Ingestar MIDI físico
  const { notes, bpm, ppq, duracion } = ingestMidi(midiBuffer);

  // 2. Pipeline IA constitucional (ruido → evaluación → rol → capas)
  const ia = new IAOrchestrator();
  const capas = ia.run(notes);

  // 3. Construir cubo MIA SUCIA v1.0
  const cubo = construirMiaSucia(capas);

  // 4. Construir contrato final
  const mia: MiaSucia = {
    version: "1.0",
    bpmDetectado: bpm,
    ppq,
    duracion,
    totalNotas: notes.length,
    totalTramos:
      cubo.capas.BASE.tramos.length +
      cubo.capas.ACOMPANAMIENTO.tramos.length +
      cubo.capas.RUIDO.tramos.length,
    cubo
  };

  // ⭐ 4.5 Generar análisis musical clásico (CAMINO B)
  const analisisMusical = generarAnalisisMusical(mia);

  // 5. Validar contrato
  if (!validarMiaSucia(mia)) {
    throw new Error("❌ El pipeline no devolvió un objeto MiaSucia válido.");
  }

  // 6. Empaquetado opcional
  if (outputPath) {
    empaquetarMiaSucia(mia, outputPath);
  }

  // 7. Devolver contrato soberano + análisis musical
  return {
    ...mia,
    analisisMusical
  };
}