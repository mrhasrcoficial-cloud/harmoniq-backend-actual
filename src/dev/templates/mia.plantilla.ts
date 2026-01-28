// ============================================================
//  backend/src/dev/templates/mia.plantilla.ts
//  Plantilla geográfica oficial para construir MIA SUCIA v1.0
//  (Alineada al contrato SUPREMO)
// ============================================================

import { MiaCubo } from "../types/mia.types.js";

export const crearPlantillaMia = (): MiaCubo => ({
  version: "1.0",

  capas: {
    BASE: {
      nombre: "BASE",
      tramos: [], // tramos HA–JL de la capa BASE
    },

    ACOMPANAMIENTO: {
      nombre: "ACOMPANAMIENTO",
      tramos: [], // tramos HA–JL de la capa ACOMPANAMIENTO
    },

    RUIDO: {
      nombre: "RUIDO",
      tramos: [], // tramos HA–JL clasificados como RUIDO
    },
  }
});