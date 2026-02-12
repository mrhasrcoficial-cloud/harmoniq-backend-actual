// backend/src/dev/analisis-musical.ts
// -------------------------------------------------------------
//  Análisis Musical Optimizado — Camino B (Producción)
//  Traduce MIA SUCIA → tempo, tonalidad, notas, acordes
// -------------------------------------------------------------

import type { MiaSucia } from "../contracts/mia-sucia.contract.js";

export interface AnalisisMusical {
  tempo: number;
  tonalidad: string | null;
  notas: string[];
  acordes: string[];
}

// Mapa de pitch class → nombres
const PC = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Escalas mayores (para detección de tonalidad)
const ESCALAS_MAYORES: Record<string, number[]> = {
  "C":  [0,2,4,5,7,9,11],
  "C#": [1,3,5,6,8,10,0],
  "D":  [2,4,6,7,9,11,1],
  "D#": [3,5,7,8,10,0,2],
  "E":  [4,6,8,9,11,1,3],
  "F":  [5,7,9,10,0,2,4],
  "F#": [6,8,10,11,1,3,5],
  "G":  [7,9,11,0,2,4,6],
  "G#": [8,10,0,1,3,5,7],
  "A":  [9,11,1,2,4,6,8],
  "A#": [10,0,2,3,5,7,9],
  "B":  [11,1,3,4,6,8,10]
};

export function generarAnalisisMusical(mia: MiaSucia): AnalisisMusical {
  const tempo = mia.bpmDetectado;

  // 1. Extraer notas base
  const base = mia.cubo.capas.BASE.tramos;

  // 2. Convertir alturas MIA → pitch class
  const notas = base.map(t => t.altura);

  // 3. Convertir a pitch class numérico
  const pcs = notas.map(n => PC.indexOf(n));

  // 4. Detectar tonalidad
  const tonalidad = detectarTonalidad(pcs);

  // 5. Detectar acordes
  const acordes = detectarAcordes(pcs);

  return {
    tempo,
    tonalidad,
    notas,
    acordes
  };
}

// -------------------------------------------------------------
//  DETECCIÓN DE TONALIDAD (Optimizada)
// -------------------------------------------------------------
function detectarTonalidad(pcs: number[]): string | null {
  if (pcs.length === 0) return null;

  const hist = new Array(12).fill(0);
  pcs.forEach(pc => hist[pc]++);

  let mejorTono = null;
  let mejorScore = -1;

  for (const tono in ESCALAS_MAYORES) {
    const escala = ESCALAS_MAYORES[tono];
    let score = 0;

    escala.forEach(pc => score += hist[pc]);

    if (score > mejorScore) {
      mejorScore = score;
      mejorTono = tono;
    }
  }

  return mejorTono ? `${mejorTono} mayor` : null;
}

// -------------------------------------------------------------
//  DETECCIÓN DE ACORDES (Optimizada)
// -------------------------------------------------------------
function detectarAcordes(pcs: number[]): string[] {
  if (pcs.length < 3) return [];

  const acordes: string[] = [];

  for (let i = 0; i < pcs.length - 2; i++) {
    const triada = [pcs[i], pcs[i+1], pcs[i+2]].sort((a,b) => a-b);

    const nombres = triada.map(pc => PC[pc]);
    acordes.push(nombres.join("-"));
  }

  return acordes;
}