// -------------------------------------------------------------
//  LayerMapper — Versión Constitucional 3.2
//  Calibración fina de BASE / ACOMPANAMIENTO / RUIDO
//  NO reasigna roles soberanos
//  NO muta notas
// -------------------------------------------------------------
// -------------------------------------------------------------
//  1. BASE — notas fundamentales (root notes)
// -------------------------------------------------------------
function esNotaBase(n, todas) {
    const pitches = todas.map(x => x.pitch);
    const minPitch = Math.min(...pitches);
    if (n.pitch <= minPitch + 5)
        return true;
    const repeticiones = todas.filter(x => x.pitch === n.pitch).length;
    if (repeticiones >= 3)
        return true;
    return false;
}
// -------------------------------------------------------------
//  2. ACOMPANAMIENTO — notas de acordes / armonía
// -------------------------------------------------------------
function esAcompanamiento(n, todas) {
    const pitches = todas.map(x => x.pitch);
    const minPitch = Math.min(...pitches);
    const maxPitch = Math.max(...pitches);
    if (n.pitch > minPitch + 5 && n.pitch < maxPitch - 5)
        return true;
    return false;
}
// -------------------------------------------------------------
//  3. RUIDO — micro-notas, aisladas, fuera de escala
// -------------------------------------------------------------
function esRuido(n, todas) {
    if (n.duration < 0.02)
        return true;
    if (n.velocity < 10)
        return true;
    if (n.pitch < 15 || n.pitch > 120)
        return true;
    const vecinos = todas.filter(m => m !== n &&
        Math.abs(m.startTime - n.startTime) <= 1.0 && // ⭐ CORRECCIÓN CONSTITUCIONAL
        Math.abs(m.pitch - n.pitch) < 4);
    if (vecinos.length === 0)
        return true;
    return false;
}
// -------------------------------------------------------------
//  Ministerio de Capas — Función oficial
// -------------------------------------------------------------
export function layerMapper(notes) {
    const BASE = [];
    const ACOMPANAMIENTO = [];
    const RUIDO = [];
    for (const n of notes) {
        // 1) RUIDO físico o contextual
        if (esRuido(n, notes)) {
            RUIDO.push(n);
            continue;
        }
        // 2) BASE — notas fundamentales
        if (esNotaBase(n, notes)) {
            BASE.push(n);
            continue;
        }
        // 3) ACOMPANAMIENTO — rango medio
        if (esAcompanamiento(n, notes)) {
            ACOMPANAMIENTO.push(n);
            continue;
        }
        // 4) Fallback seguro → acompañamiento
        ACOMPANAMIENTO.push(n);
    }
    return { BASE, ACOMPANAMIENTO, RUIDO };
}
