// backend/src/departamentoia/IAOrchestrator.ts
// -------------------------------------------------------------
//  IAOrchestrator — Orquestador IA‑MIA
//  Constitución Backend 2.2 (pipeline interno coherente)
// -------------------------------------------------------------
//  ✔ NO hace cognición
//  ✔ NO interpreta música
//  ✔ NO transforma MIDI
//  ✔ NO usa ARKLIM ni CRUZ
//  ✔ Orquesta el pipeline superficial completo
// -------------------------------------------------------------
//  Produce capas soberanas internas:
//      BASE / ACOMPANAMIENTO / RUIDO
// -------------------------------------------------------------

import type {
  InternalMidiNote,
  MiaSuciaCapas,
  MiaSuciaNote
} from "../dev/types/backend.types.js";

import type { NotaEvaluada } from "./IAEvaluator.js";

import { noiseFilterIA } from "./noise-filter-ia.js";
import { evaluarNotas } from "./IAEvaluator.js";
import { IAbrow_clasificarNotas } from "./IAbrow.js";
import { layerMapper } from "../dev/layer-mapper-dev.js";

export class IAOrchestrator {
  run(notes: InternalMidiNote[]): MiaSuciaCapas {

    // ---------------------------------------------------------
    // 1. Filtrado superficial (NO elimina notas válidas)
    // ---------------------------------------------------------
    const filtradas: InternalMidiNote[] = noiseFilterIA(notes);

    // ---------------------------------------------------------
    // 2. Evaluación superficial (tipo, estabilidad, importancia)
    // ---------------------------------------------------------
    const evaluadas: NotaEvaluada[] = evaluarNotas(filtradas);

    // ---------------------------------------------------------
    // 3. Clasificación superficial IA‑MIA
    //    (roles soberanos: BASE / ACOMPANAMIENTO / RUIDO)
    // ---------------------------------------------------------
    const clasificadas: MiaSuciaNote[] = IAbrow_clasificarNotas(evaluadas);

    // ---------------------------------------------------------
    // 4. Calibración fina de capas
    //    (ruido contextual, micro-notas, etc.)
    // ---------------------------------------------------------
    const capas: MiaSuciaCapas = layerMapper(clasificadas);

    return capas;
  }
}