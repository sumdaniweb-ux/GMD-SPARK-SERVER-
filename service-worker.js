<link rel="manifest" href="./manifest.json">
<meta name="theme-color" content="#0a0a0a">
<script>
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js');
</script>
self.addEventListener('install', e => {
  e.waitUntil(caches.open('gmd-v1').then(c => c.addAll(['./index.html', './manifest.json'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});