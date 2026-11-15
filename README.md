# 🎁 Amigo Invisible · Navidad

Web para el amigo invisible de la familia: cada uno se apunta con su nombre y su talla de camiseta. El **martes 17 de noviembre a las 10:00** se hace el sorteo solo, a todos les llega un aviso y cada uno entra con su PIN para ver a quién le ha tocado.

Extras: chat anónimo con tu amigo invisible, termómetro de regalos comprados y apuestas de "¿quién es mi amigo invisible?", que se desvelan en Nochebuena.

**El sorteo es secreto de verdad.** Cada resultado se guarda cifrado y solo se abre con el PIN de esa persona. Ni el organizador ni quien mire la base de datos puede ver quién le regala a quién.

---

## Paso 1 · Firebase (la base de datos, gratis), unos 5 minutos

1. Entra en <https://console.firebase.google.com> con tu cuenta de Google y pulsa **Crear un proyecto**. Ponle el nombre `amigo-invisible` y desactiva Google Analytics.
2. En el menú de la izquierda ve a **Compilación → Realtime Database → Crear base de datos**.
   - Ubicación: **Bélgica (europe-west1)**.
   - Modo: **bloqueado**. Lo cambias justo después.
3. Abre la pestaña **Reglas**, borra lo que haya, pega el contenido de `database.rules.json` y pulsa **Publicar**.
   (Las reglas caducan solas el 15 de enero de 2027.)
4. Pulsa el engranaje ⚙️ → **Configuración del proyecto**. Abajo, en **Tus apps**, pulsa el icono **`</>`** (web), ponle un nombre y regístrala. **No** marques Hosting.
5. Te aparece un bloque `firebaseConfig`. Copia los valores (`apiKey`, `authDomain`, `databaseURL`, `projectId` y `appId`) en **`config.js`**, sustituyendo cada `PEGA_AQUI`.
6. En `config.js` cambia también **`adminPin`** por el PIN que quieras para entrar como organizador.

## Paso 2 · Subirlo a GitHub Pages, unos 3 minutos

1. En GitHub crea un repositorio **público**, por ejemplo `amigo-invisible`.
2. Pulsa **Add file → Upload files** y arrastra **todo el contenido** de la carpeta, incluida la carpeta oculta `.github`.
   - En Mac, para ver las carpetas ocultas en el Finder pulsa `Cmd + Shift + .`
   - En Windows, en el Explorador: **Vista → Mostrar → Elementos ocultos**.
3. Ve a **Settings → Pages**. En **Branch** elige `main` y `/ (root)`, y pulsa **Save**.
4. En 1 o 2 minutos la web estará en **`https://TU-USUARIO.github.io/amigo-invisible/`**. Ese es el enlace que tienes que pasar a la familia.

## Paso 3 · Recordatorio automático por email (opcional), unos 5 minutos

El martes a las 10:00, GitHub manda un email a todos los que pusieron su correo al apuntarse.

1. En tu cuenta de Gmail activa la **verificación en 2 pasos**: <https://myaccount.google.com/security>
2. Crea una **contraseña de aplicación** en <https://myaccount.google.com/apppasswords> con el nombre `amigo invisible`. Te da 16 letras; cópialas.
3. En tu repositorio de GitHub ve a **Settings → Secrets and variables → Actions → New repository secret** y crea dos secretos:
   - `GMAIL_USER` → tu Gmail (ejemplo: `tucorreo@gmail.com`)
   - `GMAIL_APP_PASSWORD` → las 16 letras, sin espacios
4. **Para probarlo**, apúntate tú solo en la web con tu email. Luego ve a **Actions → Recordatorio amigo invisible → Run workflow**, escribe `si` y pulsa el botón verde. Te debería llegar el correo. Las pruebas forzadas no cuentan, así que el martes se enviará igual.

> GitHub a veces retrasa estos avisos unos minutos (normalmente llegan entre las 10:00 y las 10:20). Por si acaso, en la pestaña **⚙️ Organizar** de la web tienes el mensaje ya escrito para mandarlo por **WhatsApp** al grupo.

---

## Cosas que conviene saber

- **El sorteo lo hace el primer móvil que abre la web después de las 10:00 del martes.** No hace falta que nadie pulse nada. Hacen falta al menos 3 personas apuntadas.
- **Las inscripciones se cierran** a la hora del sorteo.
- **El PIN no se puede recuperar.** Es lo que protege el secreto. En cada móvil se queda guardado, así que normalmente solo hay que meterlo una vez.
  - Si alguien lo olvida **antes** del sorteo: en Firebase → Realtime Database → `people`, borra a esa persona y que se vuelva a apuntar.
  - Si lo olvida **después** del sorteo, ya no se puede abrir su regalo.
- **Como organizador solo puedes cambiar el presupuesto** (pestaña ⚙️ Organizar, con tu `adminPin`).
- **Para cambiar fechas** (sorteo o Nochebuena), edita `drawAt` y `revealAt` en `config.js` **antes** del sorteo.
- **Para empezar de cero**, en Firebase → Realtime Database pulsa los tres puntos ⋮ junto a la raíz y elige **Borrar**.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La web entera |
| `config.js` | **Lo único que tienes que editar** |
| `database.rules.json` | Reglas para pegar en Firebase |
| `.github/workflows/recordatorio.yml` | Programa el aviso del martes a las 10:00 |
| `scripts/recordatorio.js` | Envía los emails |
