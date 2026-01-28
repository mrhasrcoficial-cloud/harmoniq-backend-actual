// backend/src/index.ts
import type { MiaSucia } from "./contracts/mia-sucia.contract.js";
import { ingestMidi } from "./dev/midi-ingestor.js";
import { IAbrow_clasificarNotas, IAbrow_clasificarCapas } from "./departamentoia/IAbrow.js";
import { construirMiaSucia } from "./dev/constructor-mia-sucia.js";
import { validarMiaSucia } from "./aduana/aduana-mia-sucia.js";
import { TransportadorA } from "./teletransportador-A.js";
import { adaptarCapasATramos } from "./backend-adaptadores-tramos/adaptador-tramos.js";

export async function procesarMIDI(
  midiBuffer: Uint8Array | ArrayBuffer
): Promise<MiaSucia> {

  // 1. Normalizar buffer
  const buffer = midiBuffer instanceof Uint8Array ? midiBuffer : new Uint8Array(midiBuffer);

  // 2. Ingesta física
  const { notes, bpm, ppq, duracion } = ingestMidi(buffer);

  // 3. Clasificación superficial IA‑MIA
  const notasClasificadas = IAbrow_clasificarNotas(notes);

  // 4. Capas constitucionales (BASE / ACOMPANAMIENTO / RUIDO)
  const capas = IAbrow_clasificarCapas(notasClasificadas);

  // 5. Construcción del cubo geográfico vacío
  const cubo = construirMiaSucia(capas);

  // 6. Adaptar capas → tramos reales
  const capasConTramos = adaptarCapasATramos(capas);

  // 7. Inyectar tramos en el cubo soberano
  cubo.capas.BASE.tramos = capasConTramos.BASE.tramos;
  cubo.capas.ACOMPANAMIENTO.tramos = capasConTramos.ACOMPANAMIENTO.tramos;
  cubo.capas.RUIDO.tramos = capasConTramos.RUIDO.tramos;

  // 8. Totales derivados
  const totalNotas = notasClasificadas.length;
  const totalTramos =
    cubo.capas.BASE.tramos.length +
    cubo.capas.ACOMPANAMIENTO.tramos.length +
    cubo.capas.RUIDO.tramos.length;

  // 9. Ensamblar contrato MIA SUCIA v1.0
  const miaSucia: MiaSucia = {
    version: "1.0",
    cubo,
    bpmDetectado: bpm,
    ppq,
    duracion,
    totalNotas,
    totalTramos
  };

  // 10. Validación constitucional
  validarMiaSucia(miaSucia);

  // 11. Ministerio Exterior
  const transportador = new TransportadorA();
  return transportador.enviar(miaSucia);
}