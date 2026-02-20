// ============================================================
//  NOTIFY BROS 3 — Notifications API
//  Notification.requestPermission() → pedir permiso
//  new Notification(titulo, opciones) → mostrar notificación
// ============================================================

// ── Referencias DOM ─────────────────────────────────────────
const btnActivar   = document.getElementById('btnActivar');
const btnEnviar    = document.getElementById('btnEnviar');
const statusBox    = document.getElementById('statusBox');
const statusIcon   = document.getElementById('statusIcon');
const statusText   = document.getElementById('statusText');
const messageBox   = document.getElementById('messageBox');
const messageText  = document.getElementById('messageText');
const coinPopup    = document.getElementById('coinPopup');
const scoreEl      = document.getElementById('score');
const coinsEl      = document.getElementById('coins');

// ── Estado del juego ────────────────────────────────────────
let puntos  = 0;
let monedas = 0;

// ── Al cargar: revisar si ya hay permiso guardado ────────────
window.addEventListener('DOMContentLoaded', () => {
  // Notification.permission puede ser: 'default', 'granted', 'denied'
  if (!('Notification' in window)) {
    actualizarEstado('denied', '⛔', 'API NO SOPORTADA');
    btnActivar.disabled = true;
  } else {
    sincronizarEstadoPermiso(Notification.permission);
  }
});

// ── PASO 2: Pedir permiso con Notification.requestPermission() ─
//    Devuelve una Promesa con el resultado: 'granted' o 'denied'

function activarNotificaciones() {
  // Verificar soporte
  if (!('Notification' in window)) {
    mostrarMensaje('TU NAVEGADOR NO SOPORTA NOTIFICACIONES', 'err');
    return;
  }

  // Si ya fue concedido, no pedir de nuevo
  if (Notification.permission === 'granted') {
    mostrarMensaje('¡YA TIENES EL POWER-UP ACTIVADO!', 'warn');
    return;
  }

  // Si fue denegado, informar al usuario
  if (Notification.permission === 'denied') {
    mostrarMensaje('PERMISO DENEGADO. REVISA LA CONFIG DEL NAVEGADOR', 'err');
    return;
  }

  // SOLICITAR PERMISO — devuelve una Promesa
  Notification.requestPermission()
    .then(function (resultado) {
      sincronizarEstadoPermiso(resultado);

      if (resultado === 'granted') {
        // ✅ Usuario aceptó → mostrar notificación inmediata de bienvenida
        mostrarMensaje('¡POWER-UP OBTENIDO! PRESIONA EL BOTÓN VERDE', 'ok');
        sumarPuntos(1000);
        animarMoneda();
        // Enviar la primera notificación automáticamente
        crearNotificacion(
          '🍄 ¡POWER-UP ACTIVADO!',
          'Las notificaciones están listas. ¡Mundo 3-1 desbloqueado!'
        );
      } else {
        // ❌ Usuario rechazó
        mostrarMensaje('PERMISO DENEGADO. SIN NOTIFICACIONES', 'err');
      }
    });
}

// ── PASO 3: Enviar notificación con new Notification() ──────
//    new Notification(titulo, { body, icon }) → crea la notificación

function enviarNotificacion() {
  // Verificar que tengamos permiso antes de intentar
  if (Notification.permission !== 'granted') {
    mostrarMensaje('¡NECESITAS ACTIVAR EL PERMISO PRIMERO!', 'warn');
    return;
  }

  // Elegir mensaje aleatorio estilo Mario
  const mensajes = [
    { titulo: '🪙 ¡MONEDA OBTENIDA!',   cuerpo: 'Has recolectado una moneda. ¡Sigue así!' },
    { titulo: '🍄 ¡SUPER MUSHROOM!',    cuerpo: 'Mario ha crecido. ¡Cuidado con los Goombas!' },
    { titulo: '⭐ ¡ESTRELLA INVENCIBLE!',cuerpo: '¡Eres invencible por 10 segundos!' },
    { titulo: '🔥 ¡FLOR DE FUEGO!',     cuerpo: 'Puedes lanzar bolas de fuego ahora.' },
    { titulo: '🏁 ¡NIVEL COMPLETADO!',  cuerpo: 'Has llegado a la bandera. ¡Bien hecho!' },
  ];

  const aleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];

  crearNotificacion(aleatorio.titulo, aleatorio.cuerpo);
  sumarPuntos(100);
  animarMoneda();
  mostrarMensaje('¡NOTIFICACIÓN ENVIADA! +100 PTS', 'ok');
}

// ── Función que crea la notificación ────────────────────────
function crearNotificacion(titulo, cuerpo) {
  // new Notification(titulo, opciones)
  const notif = new Notification(titulo, {
    body: cuerpo,
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Emblem-important.svg',
    badge: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Emblem-important.svg'
  });

  // Evento: usuario hizo clic en la notificación
  notif.onclick = function () {
    window.focus();
    mostrarMensaje('¡HICISTE CLIC EN LA NOTIFICACIÓN! +50 PTS', 'ok');
    sumarPuntos(50);
    notif.close();
  };
}

// ── Sincronizar UI según el permiso actual ───────────────────
function sincronizarEstadoPermiso(permiso) {
  if (permiso === 'granted') {
    actualizarEstado('granted', '✅', 'PERMISO: CONCEDIDO');
    btnActivar.classList.add('hidden');
    btnEnviar.classList.remove('hidden');
  } else if (permiso === 'denied') {
    actualizarEstado('denied', '❌', 'PERMISO: DENEGADO');
    btnEnviar.classList.add('hidden');
  } else {
    actualizarEstado('', '❓', 'PERMISO: PENDIENTE');
  }
}

function actualizarEstado(clase, icono, texto) {
  statusBox.className = `status-box ${clase}`;
  statusIcon.textContent = icono;
  statusText.textContent = texto;
}

// ── Mostrar mensaje en la tarjeta ────────────────────────────
function mostrarMensaje(texto, tipo = 'ok') {
  messageText.textContent = texto;
  messageBox.className    = `message-box ${tipo}`;
  messageBox.classList.remove('hidden');
}

// ── Animación de moneda ──────────────────────────────────────
function animarMoneda() {
  monedas++;
  coinsEl.textContent = `×${String(monedas).padStart(2, '0')}`;

  // Mostrar popup de moneda
  coinPopup.classList.remove('hidden');
  // Reiniciar la animación
  coinPopup.style.animation = 'none';
  coinPopup.offsetHeight; // reflow
  coinPopup.style.animation = '';

  setTimeout(() => coinPopup.classList.add('hidden'), 800);
}

// ── Sumar puntos al marcador ─────────────────────────────────
function sumarPuntos(cantidad) {
  puntos += cantidad;
  scoreEl.textContent = String(puntos).padStart(6, '0');
}

// ── Golpear bloque ? decorativo ─────────────────────────────
function golpearBloque() {
  const bloque = document.getElementById('qblock');
  if (bloque.classList.contains('golpeado')) return;

  bloque.classList.add('golpeado');
  bloque.textContent = ' ';
  sumarPuntos(200);
  animarMoneda();
  mostrarMensaje('¡BLOQUE GOLPEADO! +200 PTS', 'ok');
}

// ── Temporizador HUD ─────────────────────────────────────────
let tiempo = 300;
const timerEl = document.getElementById('timer');
const intervalo = setInterval(() => {
  tiempo--;
  timerEl.textContent = tiempo;
  if (tiempo <= 0) {
    clearInterval(intervalo);
    timerEl.style.color = '#ff4444';
  }
}, 1000);