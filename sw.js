/* Este archivo debe estar colocado en la carpeta raíz del sitio. */

const VERSION = "1.46"
const CACHE = "Ganttasticos-v1.44" // Cambié esto para forzar actualización

const ARCHIVOS = [
  "favicon.ico",
  "index.html",
  "site.webmanifest",
  "css/estilos.css",
  "img/analisis.png",
  "img/BALTA.png",
  "img/gyn.png",
  "img/FRENTEGANT.png",
  "img/HECTOR.png",
  "img/ITATI.png",
  "img/iu.png",
  "img/LOGO.png",
  "img/MENDIETA.png",
  "img/PSICO.png",
  "img/psicologos.png",
  "img/pwa.png",
  "img/ROBER.png",
  "img/sync.png",
  "img/Vanne.png",
  "img/web.png",
  "img/Movil.png",
  "img/oficina.png",

  "img/Escritorio.png", // Quité oficina.png porque da error 404
  "js/lib/registraServiceWorker.js",
  "./" // Es mejor usar ./ para la raíz
];

if (self instanceof ServiceWorkerGlobalScope) {
  self.addEventListener("install", (evt) => {
    console.log("Instalando versión:", VERSION);
    evt.waitUntil(llenaElCache());
  });

  self.addEventListener("fetch", (evt) => {
    if (evt.request.method === "GET") {
      evt.respondWith(buscaLaRespuestaEnElCache(evt));
    }
  });

  self.addEventListener("activate", (evt) => {
    console.log("Service Worker activo v:", VERSION);
    // Forzar a que el nuevo SW tome el control inmediatamente
    evt.waitUntil(self.clients.claim());
  });
}

async function llenaElCache() {
  const cache = await caches.open(CACHE);
  try {
    await cache.addAll(ARCHIVOS);
    console.log("Caché cargado con éxito");
  } catch (error) {
    console.error("Fallo al cargar caché (revisa si algún archivo falta):", error);
  }
}

async function buscaLaRespuestaEnElCache(evt) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });
  return response || fetch(evt.request);
}