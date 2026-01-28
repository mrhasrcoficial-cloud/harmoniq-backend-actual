// backend/src/dev/mia-sucia-final.builder.ts ///
// -------------------------------------------------------------
//  CONSTRUCTOR FINAL MIA SUCIA — Constitución 1.4.1
// -------------------------------------------------------------

import type { BackendMidiNote } from "./types/backend.types.js";
import { asignarRoles } from "./asignar-roles.js";
import { construirCapas } from "./capas.builder.js";
import { construirMiaSucia as construirCubo } from "./constructor-mia-sucia.js";

interface DatosMiaFinal {
  notes: BackendMidiNote[];
  bpm: number;
  ppq: number;
  duracion: number;
}

export function construirMiaSuciaFinal({
  notes,
  bpm,
  ppq,
  duracion
}: DatosMiaFinal) {
  // 1. Asignar roles
  const notasConRol = asignarRoles(notes);

  // 2. Construir capas soberanas (por notas)
  const capas = construirCapas(notasConRol);

  // 3. Construir cubo soberano (vacío de tramos)
  const cubo = construirCubo(capas);

  // 4. Construir contrato MIA SUCIA v1.0
  return {
    version: "1.0",
    bpmDetectado: bpm,
    ppq,
    duracion,
    totalNotas: notes.length,

    // ⭐ Ahora se calcula desde el cubo (tramos reales)
    totalTramos:
      cubo.capas.BASE.tramos.length +
      cubo.capas.ACOMPANAMIENTO.tramos.length +
      cubo.capas.RUIDO.tramos.length,

    cubo
  };
}