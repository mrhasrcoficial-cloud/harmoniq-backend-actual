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
import { noiseFilterIA } from "./noise-filter-ia.js";
import { evaluarNotas } from "./IAEvaluator.js";
import { IAbrow_clasificarNotas } from "./IAbrow.js";
import { layerMapper } from "../dev/layer-mapper-dev.js";
export class IAOrchestrator {
    run(notes) {
        // ---------------------------------------------------------
        // 1. Filtrado superficial (NO elimina notas válidas)
        // ---------------------------------------------------------
        const filtradas = noiseFilterIA(notes);
        // ---------------------------------------------------------
        // 2. Evaluación superficial (tipo, estabilidad, importancia)
        // ---------------------------------------------------------
        const evaluadas = evaluarNotas(filtradas);
        // ---------------------------------------------------------
        // 3. Clasificación superficial IA‑MIA
        //    (roles soberanos: BASE / ACOMPANAMIENTO / RUIDO)
        // ---------------------------------------------------------
        const clasificadas = IAbrow_clasificarNotas(evaluadas);
        // ---------------------------------------------------------
        // 4. Calibración fina de capas
        //    (ruido contextual, micro-notas, etc.)
        // ---------------------------------------------------------
        const capas = layerMapper(clasificadas);
        return capas;
    }
}
