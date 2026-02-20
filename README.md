# 🍄 NOTIFICACIONES BROS 3 — Notifications API

| | |
|---|---|
| 📅 **Fecha** | 20 de febrero de 2026 |
| 👩‍🏫 **Docente** | Sabina Romero |


Proyecto demostrativo que explora el uso de la **Notifications API** del navegador, permitiendo solicitar permiso al usuario y enviar notificaciones del sistema operativo desde una página web. Desarrollado con estética pixel art de **Super Mario Bros 3** para NES.

---

## 📁 Estructura del Proyecto

```
notify-bros/
├── index.html   → Interfaz estilo Mario Bros 3 (HUD, bloques, tuberías)
├── app.js       → Lógica JavaScript (Notifications API)
├── style.css    → Estilos pixel art con colores NES auténticos
└── README.md    → Este archivo
```

---

## 🚀 ¿Cómo ejecutar?

1. Descarga o clona los archivos del proyecto.
2. Abre `index.html` en tu navegador.
3. Haz clic en **▶ PEDIR PERMISO** y acepta la solicitud del navegador.
4. Una vez concedido el permiso, usa **🔔 ENVIAR NOTIFICACIÓN** para probar.

> ⚠️ Las notificaciones requieren que la página se sirva desde **HTTPS** o **localhost**. En algunos navegadores como Firefox el permiso puede variar según la configuración del sistema operativo.

---

## 🌐 API Utilizada

### Notifications API — `Notification`

API nativa del navegador para enviar mensajes al escritorio del usuario, incluso cuando la página está en segundo plano.

---

## 🧠 Flujo de la aplicación

```
[Click en ▶ PEDIR PERMISO]
           ↓
Notification.requestPermission()
           ↓
   ¿Qué respondió el usuario?
      ↙             ↘
 'granted'         'denied'
    ↓                  ↓
Mostrar botón     Mostrar error
🔔 ENVIAR         en pantalla
    ↓
[Click en 🔔 ENVIAR NOTIFICACIÓN]
    ↓
new Notification(titulo, { body })
    ↓
Notificación visible en el escritorio
```

---

## 📋 Los 3 pasos clave de la API

### Paso 1 — Verificar el estado del permiso

Antes de pedir permiso, revisamos si ya fue concedido o denegado anteriormente. `Notification.permission` puede tener tres valores:

```javascript
// 'default'  → el usuario aún no ha respondido
// 'granted'  → el usuario aceptó
// 'denied'   → el usuario rechazó (no se puede volver a pedir)

if (Notification.permission === 'granted') {
    // ya tenemos permiso, podemos notificar directamente
}
```

### Paso 2 — Solicitar permiso con `requestPermission()`

Muestra el diálogo del navegador pidiendo permiso al usuario. Devuelve una **Promesa**.

```javascript
Notification.requestPermission()
    .then(function (resultado) {
        if (resultado === 'granted') {
            // ✅ usuario aceptó → podemos crear notificaciones
        } else {
            // ❌ usuario rechazó → no podemos notificar
        }
    });
```

> ⚠️ Una vez denegado (`'denied'`), el navegador no vuelve a mostrar el diálogo. El usuario debe cambiar el permiso manualmente en la configuración del navegador.

### Paso 3 — Crear notificación con `new Notification()`

Crea y muestra la notificación en el escritorio del sistema operativo.

```javascript
const notif = new Notification('Título de la notificación', {
    body: 'Texto del cuerpo del mensaje',
    icon: 'ruta/a/icono.png'   // opcional
});

// Evento: usuario hizo clic en la notificación
notif.onclick = function () {
    window.focus();
    notif.close();
};
```

---

## 🧩 Conceptos clave

| Concepto | Descripción |
|---|---|
| `Notification.permission` | Propiedad estática que indica el estado actual del permiso |
| `requestPermission()` | Muestra el diálogo de permiso. Devuelve una Promesa |
| `new Notification(titulo, opciones)` | Crea y muestra una notificación en el escritorio |
| `notif.onclick` | Evento que se dispara cuando el usuario hace clic en la notificación |
| `notif.close()` | Cierra la notificación manualmente |
| `.then()` / `.catch()` | Manejo de la Promesa que devuelve `requestPermission()` |

---

## 🎮 Extras del juego

El diseño incluye elementos interactivos más allá del requisito mínimo del ejercicio:

| Elemento | Acción |
|---|---|
| **Bloque ?** | Golpéalo para ganar +200 puntos |
| **Score (MARIO)** | Sube con cada acción: activar permiso, enviar notificación, clic en notificación |
| **Monedas 🪙** | Contador que aumenta con cada notificación enviada |
| **Temporizador** | Cuenta regresiva de 300 segundos estilo NES |
| **Click en notificación** | Enfoca la ventana y suma +50 puntos |

---

## 🎨 Diseño

La interfaz recrea la estética de **Super Mario Bros 3 para NES (1988)** con:

- **Paleta de colores NES auténtica** — azul cielo `#5c94fc`, ladrillo `#c84c0c`, verde tubería `#00a800`
- **Bloques con sombras internas** — efecto `inset box-shadow` que simula el aspecto 8-bit
- **Fuente `Press Start 2P`** — tipografía pixel art de Google Fonts
- **Nubes CSS animadas** — construidas solo con `box-shadow`, sin imágenes
- **HUD completo** — score, monedas, mundo y tiempo igual al juego original
- **Tuberías y suelo decorativo** — fieles a los colores y proporciones del juego

---

## 🔍 ¿Cómo gestionar los permisos de notificaciones?

Si accidentalmente denegaste el permiso, puedes restablecerlo desde el navegador:

**Chrome / Edge:**
1. Clic en el candado 🔒 en la barra de dirección
2. Selecciona **Configuración del sitio**
3. Busca **Notificaciones** y cámbialo a **Preguntar**

**Firefox:**
1. Clic en el candado 🔒 en la barra de dirección
2. Selecciona **Más información**
3. Pestaña **Permisos** → **Enviar notificaciones** → **Usar configuración predeterminada**

---

## 🛠️ Tecnologías

- HTML5
- CSS3 (pixel art con `box-shadow`, animaciones `@keyframes`, variables CSS)
- JavaScript ES6+ (Promises, Notifications API, eventos)
- [Google Fonts](https://fonts.google.com/) — Press Start 2P
- Notifications API (nativa del navegador)

