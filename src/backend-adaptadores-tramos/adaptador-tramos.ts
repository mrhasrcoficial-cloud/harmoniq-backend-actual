// -------------------------------------------------------------
//  ADAPTADOR DE TRAMOS — Constitución 2.2
//  Convierte MiaSuciaCapas → PMSmiaTramo con pitch real
// -------------------------------------------------------------

import type { MiaSuciaCapas } from "../dev/types/backend.types.js";
import type { PMSmiaTramo, PMSmiaCapa, PMSmiaAltura } from "../dev/types/mia.types.js";
import { pitchToHAJL } from "./altura-hajl.js";

// ⭐ Interfaz exportada correctamente (idioma soberano)
export interface MiaCapasTramos {
  BASE: {
    nombre: string;
    tramos: PMSmiaTramo[];
  };
  ACOMPANAMIENTO: {
    nombre: string;
    tramos: PMSmiaTramo[];
  };
  RUIDO: {
    nombre: string;
    tramos: PMSmiaTramo[];
  };
}

function convertirListaANTramos(
  lista: MiaSuciaCapas[keyof MiaSuciaCapas],
  capa: PMSmiaCapa
): PMSmiaTramo[] {
  return lista.map(n => {
    const alturaTexto = pitchToHAJL(n.pitch) as PMSmiaAltura;

    const inicio = Number(n.startTime) || 0;
    const dur = Number(n.duration) || 0;
    const fin = Math.max(inicio + dur, inicio + 0.01);

    return {
      capa,
      pitch: n.pitch,          // ⭐ pitch MIDI real
      alturaTexto,             // ⭐ etiqueta HA–JL decorativa
      inicio,
      fin
    };
  });
}

export function construirTramosDesdeCapas(capas: MiaSuciaCapas): MiaCapasTramos {
  const baseTramos = convertirListaANTramos(capas.BASE, "BASE");
  const acompTramos = convertirListaANTramos(capas.ACOMPANAMIENTO, "ACOMPANAMIENTO");
  const ruidoTramos = convertirListaANTramos(capas.RUIDO, "RUIDO");

  return {
    BASE: { nombre: "BASE", tramos: baseTramos },
    ACOMPANAMIENTO: { nombre: "ACOMPANAMIENTO", tramos: acompTramos },
    RUIDO: { nombre: "RUIDO", tramos: ruidoTramos }
  };
}

// ⭐ Export oficial del adaptador (puente soberano)
export function adaptarCapasATramos(capas: MiaSuciaCapas): MiaCapasTramos {
  return construirTramosDesdeCapas(capas);
}