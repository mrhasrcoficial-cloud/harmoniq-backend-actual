// backend/src/departamentoia/IAOrchestrator.ts
// -------------------------------------------------------------
//  IAOrchestrator — Orquestador superficial IA‑MIA
//  Constitución Backend 1.4.1
// -------------------------------------------------------------
//  ✔ NO hace cognición
//  ✔ NO interpreta música
//  ✔ NO transforma MIDI
//  ✔ NO usa ARKLIM ni CRUZ
//  ✔ Solo filtra ruido superficial y clasifica roles
// -------------------------------------------------------------
//
//  Produce capas soberanas:
//      BASE / ACOMPANAMIENTO / RUIDO
//
// -------------------------------------------------------------

import type {
  BackendMidiNote,
  MiaSuciaCapas
} from "../dev/types/backend.types.js";

import { noiseFilterIA } from "./noise-filter-ia.js";
import {
  IAbrow_clasificarNotas,
  IAbrow_clasificarCapas
} from "./IAbrow.js";

export class IAOrchestrator {
  run(notes: BackendMidiNote[]): MiaSuciaCapas {
    // 1. Filtro superficial de ruido
    const filtered = noiseFilterIA(notes);

    // 2. Clasificación superficial IA‑MIA
    const classified = IAbrow_clasificarNotas(filtered);

    // 3. Capas soberanas (BASE / ACOMPANAMIENTO / RUIDO)
    return IAbrow_clasificarCapas(classified);
  }
}