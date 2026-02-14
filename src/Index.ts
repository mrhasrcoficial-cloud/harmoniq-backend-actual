// backend/src/index.ts
// -------------------------------------------------------------
//  ENTRADA OFICIAL BACKEND — Constitución 2.2
// -------------------------------------------------------------

import type { MiaSucia, ContractMidiNote } from "./contracts/mia-sucia.contract.js";

import { ingestMidi } from "./dev/midi-ingestor.js";
import { IAOrchestrator } from "./departamentoia/IAOrchestrator.js";

import { adaptarCapasATramos } from "./backend-adaptadores-tramos/adaptador-tramos.js";
import { construirMiaSucia } from "./dev/constructor-mia-sucia.js";

import { validarMiaSucia as validarMiaConstitucional } from "./dev/validar-mia-sucia.js";
import { generarAnalisisMusical } from "./dev/analisis-musical.js";

// ⭐ Clasificador por tramos
import { clasificarNotasPorCapa } from "./dev/clasificar-notas-por-capa.js";

export async function procesarMIDI(
  midiBuffer: Uint8Array | ArrayBuffer
): Promise<MiaSucia & { analisisMusical: any }> {

  const buffer =
    midiBuffer instanceof Uint8Array ? midiBuffer : new Uint8Array(midiBuffer);

  // 1. Ingesta física → InternalMidiNote[]
  const { notes, bpm, ppq, duracion } = ingestMidi(buffer);

  // 2. IA constitucional → MiaSuciaCapas (MiaSuciaNote[])
  const ia = new IAOrchestrator();
  const capasNotas = ia.run(notes);

  // 3. Adaptar capas → tramos
  const capasConTramos = adaptarCapasATramos(capasNotas);

  // 4. Construir cubo soberano
  const cubo = construirMiaSucia(capasConTramos);

  // 5. Totales
  const totalNotas =
    capasNotas.BASE.length +
    capasNotas.ACOMPANAMIENTO.length +
    capasNotas.RUIDO.length;

  const totalTramos =
    cubo.capas.BASE.tramos.length +
    cubo.capas.ACOMPANAMIENTO.tramos.length +
    cubo.capas.RUIDO.tramos.length;

  // ⭐ 6.1 Mapear notas YA CLASIFICADAS (MiaSuciaNote) → ContractMidiNote
  const notasOriginales: ContractMidiNote[] = [
    ...capasNotas.BASE,
    ...capasNotas.ACOMPANAMIENTO,
    ...capasNotas.RUIDO
  ].map(n => ({
    pitch: n.pitch,
    startTime: n.startTime,
    duration: n.duration,
    velocity: n.velocity,
    trackIndex: n.trackIndex,
    channel: n.channel,
    role: n.role // ✔ ahora sí existe
  }));

  // ⭐ 6.2 Clasificar notas reales por capa usando TRAMOS
  const notasPorCapa = clasificarNotasPorCapa(notasOriginales, cubo);

  // 7. Ensamblar contrato soberano
  const miaSucia: MiaSucia = {
    version: "1.0",
    cubo,
    bpmDetectado: bpm,
    ppq,
    duracion,
    totalNotas,
    totalTramos,
    notasOriginales,
    notasPorCapa
  };

  const analisisMusical = generarAnalisisMusical(miaSucia);

  const esValida = validarMiaConstitucional(miaSucia);
  if (!esValida) {
    throw new Error("MIA SUCIA inválida según el validador constitucional.");
  }

  return {
    ...miaSucia,
    analisisMusical
  };
}