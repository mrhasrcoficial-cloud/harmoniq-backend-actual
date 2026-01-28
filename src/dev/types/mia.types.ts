// ============================================================
//  backend/src/dev/types/mia.types.ts
//  Marco geográfico oficial de MIA SUCIA v1.0 (Alineado a SUPREMO)
// ============================================================

// 64 alturas oficiales (HA–JL)
export type PMSmiaAltura =
  | "HA" | "HB" | "HC" | "HD" | "HE" | "HF" | "HG" | "HH" | "HI" | "HJ" | "HK" | "HL"
  | "HM" | "HN" | "HO" | "HP" | "HQ" | "HR" | "HS" | "HT" | "HU" | "HV" | "HW" | "HX"
  | "HY" | "HZ"
  | "IA" | "IB" | "IC" | "ID" | "IE" | "IF" | "IG" | "IH" | "II" | "IJ" | "IK" | "IL"
  | "IM" | "IN" | "IO" | "IP" | "IQ" | "IR" | "IS" | "IT" | "IU" | "IV" | "IW" | "IX"
  | "IY" | "IZ"
  | "JA" | "JB" | "JC" | "JD" | "JE" | "JF" | "JG" | "JH" | "JI" | "JJ" | "JK" | "JL";

// Capas soberanas del cubo PMSmia
// SEP1–SEP3 quedan reservadas para expansiones constitucionales
export type PMSmiaCapa =
  | "BASE"
  | "ACOMPANAMIENTO"
  | "RUIDO"
  | "SEP1"
  | "SEP2"
  | "SEP3";

// Tramo fundamental del cubo PMSmia
export type PMSmiaTramo = {
  altura: PMSmiaAltura;
  inicio: number;
  fin: number;
  capa: PMSmiaCapa;
};

// Nombres de capas soberanas del cubo MIA SUCIA v1.0
export type MiaCapaNombre = "BASE" | "ACOMPANAMIENTO" | "RUIDO";

// Capa geográfica dentro del cubo
export type MiaCapa = {
  nombre: MiaCapaNombre;
  tramos: PMSmiaTramo[];
};

// Cubo geográfico completo MIA SUCIA v1.0
export type MiaCubo = {
  version: "1.0";
  capas: {
    BASE: MiaCapa;
    ACOMPANAMIENTO: MiaCapa;
    RUIDO: MiaCapa;
  };
};