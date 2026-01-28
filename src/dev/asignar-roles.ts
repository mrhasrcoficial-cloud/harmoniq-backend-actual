import type { BackendMidiNote, MiaSuciaNote, MiaNotaRol } from "./types/backend.types.js";

export function asignarRoles(notes: BackendMidiNote[]): MiaSuciaNote[] {
  return notes.map(n => {
    const role: MiaNotaRol =
      n.pitch < 48
        ? "base"
        : n.pitch < 84
        ? "acompanamiento"
        : "ruido";

    return {
      ...n,
      role,
      tags: [],
      inScale: role !== "ruido",
      valid: true
    };
  });
}