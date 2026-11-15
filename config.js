// =====================================================================
//  CONFIGURACIÓN DEL AMIGO INVISIBLE
//  Rellena esto siguiendo el README (paso 1). Solo tienes que tocar este archivo.
// =====================================================================
window.CONFIG = {
  // 1) Pega aquí lo que te da Firebase (Configuración del proyecto → Tus apps → Web)
  firebase: {
    apiKey: "PEGA_AQUI",
    authDomain: "PEGA_AQUI.firebaseapp.com",
    databaseURL: "https://PEGA_AQUI-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "PEGA_AQUI",
    appId: "PEGA_AQUI"
  },

  // 2) PIN del organizador (solo sirve para cambiar el presupuesto)
  adminPin: "0000",

  // 3) Fechas (hora de España)
  drawAt:   "2026-11-17T10:00:00+01:00",   // martes 17 de noviembre a las 10:00 → sorteo + recordatorio
  revealAt: "2026-12-24T21:00:00+01:00",   // Nochebuena → cada uno descubre quién era su amigo invisible

  // 4) Presupuesto inicial (luego lo cambias desde la web)
  budget: 25,

  // 5) Texto pequeño de la cabecera
  familyName: "Familia"
};
