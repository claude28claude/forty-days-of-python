// sw.js — keeps the course working without internet.
//
// Site files: network first, so a new version always wins when online; the
// cached copy is used only when the network fails. Pyodide's files (Python
// itself, about 12 MB) never change for one version, so they come from the
// cache first; they are cached the first time Python loads.
//
// Bump VERSION whenever a site file changes or a file is added to SITE_FILES.
// The page registers this file only where service workers exist (app.js,
// setupOffline); everywhere else the site works online exactly as before.

const VERSION = "19";
const SITE_CACHE = `fortydays-site-v${VERSION}`;
const PYODIDE_BASE = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/"; // the same version as py-worker.js
const PYODIDE_CACHE = "fortydays-pyodide-v314.0.7";

const SITE_FILES = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "runner.js",
  "py-worker.js",
  "harness.py",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "course/core.js",
  "course/week1.js",
  "course/week2.js",
  "course/week3.js",
  "course/week4.js",
  "course/week5.js",
  "course/week6.js",
  "course/week6b.js",
  "course/week7.js",
  "course/week8.js",
  "course/week9.js",
  "course/week10.js",
  "course/week11.js",
  "course/week12.js",
  "course/week13.js",
  "course/week14.js",
  "course/week15.js",
  "course/week16.js",
  "course/week17.js",
  "course/week18.js",
  "course/week19.js",
  "course/glossary.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SITE_CACHE).then((cache) => cache.addAll(SITE_FILES)).then(() => self.skipWaiting()));
});

// Old site caches go; the Pyodide cache stays unless Pyodide's version changed.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names
        .filter((name) => name.startsWith("fortydays-") && name !== SITE_CACHE && name !== PYODIDE_CACHE)
        .map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (request.url.startsWith(PYODIDE_BASE)) event.respondWith(cacheFirst(request));
  else if (url.origin === self.location.origin) event.respondWith(networkFirst(request, siteKey(url)));
  else if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") event.respondWith(networkFirst(request, request));
  // Anything else goes to the network as normal.
});

// Site files are kept without their "?v=2" part, so one copy of each file is kept and found.
function siteKey(url) {
  const key = new URL(url);
  key.search = "";
  key.hash = "";
  return key.href;
}

function keep(cacheName, key, response) {
  // A failed cache write (for example, storage is full) must not stop the page; the response still goes back.
  caches.open(cacheName)
    .then((cache) => cache.put(key, response))
    .catch((err) => console.warn(`Could not keep a copy of ${typeof key === "string" ? key : key.url}:`, err));
}

async function networkFirst(request, key) {
  try {
    const response = await fetch(request);
    if (response.ok || response.type === "opaque") keep(SITE_CACHE, key, response.clone());
    return response;
  } catch (err) {
    const cached = await caches.match(key);
    if (cached) return cached;
    if (request.mode === "navigate") {
      const page = await caches.match(new URL("index.html", self.registration.scope).href);
      if (page) return page;
    }
    throw err; // offline and never cached: the browser shows its normal "no internet" error
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { cacheName: PYODIDE_CACHE });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) keep(PYODIDE_CACHE, request, response.clone());
  return response;
}
