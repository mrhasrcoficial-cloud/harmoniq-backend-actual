// -------------------------------------------------------------
//  CLASIFICAR NOTAS POR CAPA — Constitución 2.2
//  Usa los TRAMOS del cubo para asignar cada nota real a su capa
// -------------------------------------------------------------

import type { ContractMidiNote } from "../contracts/mia-sucia.contract.js";

type NombreCapa = "BASE" | "ACOMPANAMIENTO" | "RUIDO";

export function clasificarNotasPorCapa(
  notas: ContractMidiNote[],
  cubo: any
) {
  const resultado: Record<NombreCapa, ContractMidiNote[]> = {
    BASE: [],
    ACOMPANAMIENTO: [],
    RUIDO: []
  };

  const capas = cubo?.capas ?? {};

  const todasLasCapas = [
    { nombre: "BASE" as NombreCapa, tramos: capas.BASE?.tramos ?? [] },
    { nombre: "ACOMPANAMIENTO" as NombreCapa, tramos: capas.ACOMPANAMIENTO?.tramos ?? [] },
    { nombre: "RUIDO" as NombreCapa, tramos: capas.RUIDO?.tramos ?? [] }
  ];

  for (const nota of notas) {
    for (const capa of todasLasCapas) {
      for (const tramo of capa.tramos) {
        if (nota.startTime >= tramo.inicio && nota.startTime < tramo.fin) {
          resultado[capa.nombre].push(nota);
          break;
        }
      }
    }
  }

  return resultado;
}