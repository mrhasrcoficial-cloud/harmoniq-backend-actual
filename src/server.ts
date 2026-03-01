// backend/src/server.ts
import express from "express";
import cors from "cors";
import { procesarYEmpaquetarMia } from "./dev/procesar-y-empaquetar-mia.js";

const app = express();

// ⭐ CORS SOBERANO — compatible con Express 5 y Railway
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// ⭐ Preflight OPTIONS — Express 5 NO acepta "*" → usamos "/*"
app.options("/*", cors());

// Mantener JSON para compatibilidad (no usar para archivos grandes)
app.use(express.json({ limit: "50mb" }));

// Endpoint recomendado: recibir binario puro
app.use(
  "/mia-binary",
  express.raw({ type: "application/octet-stream", limit: "200mb" })
);

app.post("/mia-binary", async (req, res) => {
  try {
    const body = req.body;
    if (!body || (Buffer.isBuffer(body) && body.length === 0)) {
      return res.status(400).json({ error: "Body binario vacío" });
    }

    const buffer = new Uint8Array(body);
    console.log("📥 /mia-binary recibido bytes:", buffer.length);

    const mia = await procesarYEmpaquetarMia(buffer);

    console.log("📤 Enviando MIA SUCIA:");
    console.log("   - version:", mia.version);
    console.log("   - bpmDetectado:", mia.bpmDetectado);
    console.log("   - ppq:", mia.ppq);
    console.log("   - duracion:", mia.duracion);
    console.log("   - totalNotas:", mia.totalNotas);
    console.log("   - totalTramos:", mia.totalTramos);
    console.log("   - capas:", {
      BASE: mia.cubo.capas.BASE.tramos.length,
      ACOMPANAMIENTO: mia.cubo.capas.ACOMPANAMIENTO.tramos.length,
      RUIDO: mia.cubo.capas.RUIDO.tramos.length
    });

    return res.json(mia);
  } catch (err) {
    console.error("❌ Error en /mia-binary:", err);
    return res.status(500).json({ error: "Error interno en backend" });
  }
});

// (Opcional) Mantener endpoint base64 para compatibilidad
app.post("/mia", async (req, res) => {
  try {
    const { midiBase64 } = req.body;
    if (!midiBase64)
      return res.status(400).json({ error: "midiBase64 requerido" });

    const buffer = Uint8Array.from(Buffer.from(midiBase64, "base64"));
    console.log("📥 /mia (base64) recibido bytes:", buffer.length);

    const mia = await procesarYEmpaquetarMia(buffer);

    console.log("📤 Enviando MIA SUCIA:");
    console.log("   - version:", mia.version);
    console.log("   - bpmDetectado:", mia.bpmDetectado);
    console.log("   - ppq:", mia.ppq);
    console.log("   - duracion:", mia.duracion);
    console.log("   - totalNotas:", mia.totalNotas);
    console.log("   - totalTramos:", mia.totalTramos);
    console.log("   - capas:", {
      BASE: mia.cubo.capas.BASE.tramos.length,
      ACOMPANAMIENTO: mia.cubo.capas.ACOMPANAMIENTO.tramos.length,
      RUIDO: mia.cubo.capas.RUIDO.tramos.length
    });

    return res.json(mia);
  } catch (err) {
    console.error("❌ Error en /mia:", err);
    return res.status(500).json({ error: "Error interno en backend" });
  }
});

const PORT = Number(process.env.PORT ?? 3000);
app.listen(PORT, () => {
  console.log(`🚀 Backend constitucional escuchando en http://localhost:${PORT}`);
});