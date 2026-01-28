// backend/src/dev/aduana/aduana-mia-sucia.ts
import type { MiaSucia } from "../contracts/mia-sucia.contract.js";
import type { MiaCubo, MiaCapa, PMSmiaTramo } from "../dev/types/mia.types.js";

// Tipo de sello emitido por la Aduana Backend
export interface SelloAduanaBackend {
  ok: boolean;
  totalNotes: number;
  signature: "aduana-backend-1.4.1";
  timestamp: number;
}

// Validación principal (contrato SUPREMO)
export function validarMiaSucia(mia: MiaSucia): SelloAduanaBackend {
  if (mia.version !== "1.0") {
    throw new Error("Aduana Backend: Versión MIA SUCIA inválida.");
  }

  // Validar cubo soberano
  validarCubo(mia.cubo);

  // Validar metadata física requerida por SUPREMO
  if (typeof mia.bpmDetectado !== "number") {
    throw new Error("Aduana Backend: bpmDetectado inválido.");
  }
  if (typeof mia.ppq !== "number") {
    throw new Error("Aduana Backend: ppq inválido.");
  }
  if (typeof mia.duracion !== "number") {
    throw new Error("Aduana Backend: duracion inválida.");
  }

  // Totales opcionales
  if (mia.totalNotas !== undefined && typeof mia.totalNotas !== "number") {
    throw new Error("Aduana Backend: totalNotas inválido.");
  }
  if (mia.totalTramos !== undefined && typeof mia.totalTramos !== "number") {
    throw new Error("Aduana Backend: totalTramos inválido.");
  }

  return {
    ok: true,
    totalNotes: mia.totalNotas ?? 0,
    signature: "aduana-backend-1.4.1",
    timestamp: Date.now()
  };
}

// Validación del cubo geográfico MIA SUCIA v1.0
function validarCubo(cubo: MiaCubo) {
  if (!cubo || typeof cubo !== "object") {
    throw new Error("Aduana Backend: cubo inválido.");
  }
  if (cubo.version !== "1.0") {
    throw new Error("Aduana Backend: versión del cubo inválida.");
  }

  // Capas soberanas (Constitución 1.4.1)
  validarCapa(cubo.capas.BASE, "BASE");
  validarCapa(cubo.capas.ACOMPANAMIENTO, "ACOMPANAMIENTO");
  validarCapa(cubo.capas.RUIDO, "RUIDO");
}

// Validación de una capa soberana
function validarCapa(capa: MiaCapa, nombre: string) {
  if (!capa || typeof capa !== "object") {
    throw new Error(`Aduana Backend: capa ${nombre} inválida.`);
  }
  if (capa.nombre !== nombre) {
    throw new Error(`Aduana Backend: nombre de capa ${nombre} inválido.`);
  }
  if (!Array.isArray(capa.tramos)) {
    throw new Error(`Aduana Backend: tramos de ${nombre} inválidos.`);
  }
  capa.tramos.forEach(validarTramo);
}

// Validación superficial de un tramo PMSmia
function validarTramo(t: PMSmiaTramo) {
  if (typeof t.altura !== "string") {
    throw new Error("Aduana Backend: tramo.altura inválido.");
  }
  if (typeof t.inicio !== "number" || t.inicio < 0 || t.inicio > 127) {
    throw new Error("Aduana Backend: tramo.inicio inválido.");
  }
  if (typeof t.fin !== "number" || t.fin < 0 || t.fin > 127) {
    throw new Error("Aduana Backend: tramo.fin inválido.");
  }
  if (t.fin < t.inicio) {
    throw new Error("Aduana Backend: tramo.fin < tramo.inicio.");
  }
  if (typeof t.capa !== "string") {
    throw new Error("Aduana Backend: tramo.capa inválido.");
  }
}