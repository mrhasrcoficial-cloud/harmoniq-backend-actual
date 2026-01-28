export const CONSTITUCION_BACKEND_VERSION = "1.4.1";

export const CONSTITUCION_BACKEND_TEXTO = `
🔥 CONSTITUCIÓN DEL PAÍS BACKEND
Versión 1.4.1 — Edición Geográfica MIA SUCIA v1.0
Ratificada por Ransa, Guardián Supremo del Backend

PREÁMBULO
El país Backend es la aduana, el clasificador superficial y el constructor oficial
del cubo geográfico MIA SUCIA v1.0. Su misión es recibir MIDI crudo, validarlo
superficialmente, dividirlo en capas sin modificarlo, etiquetar notas según su rol
superficial y construir el cubo MIA SUCIA v1.0 sin cognición.

Backend no limpia, no corrige, no interpreta, no analiza y no transforma el MIDI.
Backend no genera cognición, tonalidad, armonía, estructura, LIM ni ARK.
Backend no asigna alturas musicales reales: usa alturas HA–JL constitucionales.

✔ Backend separa exclusivamente en las capas superficiales:
- BASE
- ACOMPANAMIENTO
- RUIDO

✔ Backend construye exclusivamente:
- El cubo geográfico MIA SUCIA v1.0
- Con capas soberanas: BASE / ACOMPANAMIENTO / RUIDO
- Con tramos PMSmia (altura HA–JL, inicio 0–127, fin 0–127)

TÍTULO I — PROPÓSITO DEL BACKEND
Artículo 1 — Rol fundamental
Backend es el país del servidor, la aduana y la clasificación superficial del MIDI.

Artículo 2 — IA‑MIA
La IA‑MIA realiza:
- División superficial en BASE / ACOMPANAMIENTO / RUIDO
- Clasificación superficial
- Etiquetado sin alterar datos
IA‑MIA no realiza cognición.

TÍTULO II — GEOGRAFÍA OFICIAL DEL PAÍS BACKEND
backend/
  CONSTITUCION_BACKEND.ts
  package.json
  tsconfig.json

  src/
    server.ts
    Index.ts
    teletransportador-A.ts

    aduana/
      aduana-mia-sucia.ts

    departamentoia/
      IAbrow.ts
      IAOrchestrator.ts
      noise-filter-ia.ts

    dev/
      procesar-y-empaquetar-mia.ts
      constructor-mia-sucia.ts
      desempaquetador-mia-sucia.ts
      empaquetador-mia-sucia.ts
      ensamblador-doc.ts
      index.ts
      layer-mapper.ts
      midi-ingestor.ts
      validar-mia-sucia.ts

      utils/
        base64.ts
        buffer.ts

      types/
        backend.types.ts
        mia.types.ts
        tonejs-midi.d.ts

    backend-adaptadores-tramos/
      adaptador-tramos.ts

    contracts/
      mia-sucia.contract.ts

  dist/
    (versión compilada)

TÍTULO III — MÓDULOS SOBERANOS

Artículo 4 — Aduana MIDI
Archivo:
- aduana-mia-sucia.ts
Función:
- Validar entrada MIDI superficialmente
- Rechazar archivos corruptos
- No modificar contenido

Artículo 5 — IA‑MIA (departamentoia/)
Archivos:
- IAbrow.ts
- IAOrchestrator.ts
- noise-filter-ia.ts
Función:
- Clasificación superficial
- División en capas BASE / ACOMPANAMIENTO / RUIDO
- Etiquetado superficial
- No cognición

Artículo 6 — MIA Builder (dev/)
Archivos:
- constructor-mia-sucia.ts
- procesar-y-empaquetar-mia.ts
- desempaquetador-mia-sucia.ts
- empaquetador-mia-sucia.ts
- validar-mia-sucia.ts
- midi-ingestor.ts
- layer-mapper.ts
Función:
- Construir el cubo geográfico MIA SUCIA v1.0
- Usar capas soberanas BASE / ACOMPANAMIENTO / RUIDO
- Validar superficialmente
- Convertir MIDI → notas físicas
- No corregir
- No interpretar
- No generar cognición

Artículo 7 — Adaptador de Tramos
Archivo:
- backend-adaptadores-tramos/adaptador-tramos.ts
Función:
- Convertir capas superficiales → tramos HA–JL
- Generar PMSmiaTramo[]
- No cognición

Artículo 8 — Contratos oficiales
Archivo:
- mia-sucia.contract.ts
Función:
- Definir el contrato diplomático MIA SUCIA v1.0
- Incluir: version, midiOriginal, cubo, selloEntrada
- No incluir ARKLIM
- No incluir cognición

Artículo 9 — Transportador diplomático
Archivo:
- teletransportador-A.ts
Función:
- Mover MIA SUCIA fuera del país Backend
- No modificar
- No validar
- No interpretar

TÍTULO IV — RUTAS SOBERANAS
Artículo 10 — Reglas de importación
- Toda importación interna debe comenzar en backend/src/
- Quedan prohibidas rutas hacia SRC, ARKLIM o CRUZ
- Queda prohibido incluir carpetas externas como ../respaldo/
- Queda prohibido incluir transformadores cognitivos
- Queda prohibido incluir contratos ARKLIM

TÍTULO V — PROHIBICIONES CONSTITUCIONALES
Backend tiene prohibido:
- Modificar el MIDI original
- Alterar pitch, duración, velocity o posición
- Incluir ARKLIM cognitivo
- Incluir CRUZ perceptivo
- Incluir UI o visualización
- Incluir legacy CDARKLIM
- Generar tonalidad, armonía, estructura, LIM o ARK
- Construir ARKLIMContractV4
- Usar transformadores cognitivos
- Usar rutas relativas hacia otros países
✔ Backend tiene prohibido detectar tonalidad o escala, incluso de forma preliminar.

TÍTULO VI — PROCESO OFICIAL MIA SUCIA (1.4.1)

1. Entrada
- Express recibe MIDI en binario o base64
- Se convierte a Uint8Array

2. IA‑MIA
- ingestMidi → convierte MIDI a notas físicas
- IAbrow → clasifica superficialmente
- IAbrow_clasificarCapas → separa en BASE / ACOMPANAMIENTO / RUIDO

3. MIA Builder
- construirMiaSucia(capas) → crea el cubo geográfico MIA SUCIA v1.0
- adaptarCapasATramos → genera tramos HA–JL
- Inyección soberana en BASE / ACOMPANAMIENTO / RUIDO
- validarMiaSucia → valida el contrato final
- empaquetador → opcionalmente escribe archivo
- desempaquetador → lectura inversa

4. Salida
- Se devuelve MIA SUCIA v1.0
- Sin cognición
- Sin ARKLIM
- Sin análisis profundo

TÍTULO VII — DISPOSICIONES FINALES
Artículo 12 — Vigencia
Esta Constitución entra en vigor al ser incluida en el repositorio.

Artículo 13 — Guardián Supremo
El guardián del país Backend es Ransa.

✔ Constitución Backend 1.4.1 — Edición Definitiva
✔ Lista para control superior
✔ Lista para gobernar el país Backend
`;

export const CONSTITUCION_BACKEND = {
  version: CONSTITUCION_BACKEND_VERSION,
  texto: CONSTITUCION_BACKEND_TEXTO,
};