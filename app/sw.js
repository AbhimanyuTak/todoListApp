var CACHE_NAME = 'todoapp-cache-v1';
var urlsToCache = [
  '.',
  'index.html',
  'css/bundle.css',
  'css/main.css',
  'views/home.html',
  'views/tasks.html',
  'js/app.js',
  'js/libs/bundle.js',
  'js/services/task_factory.js',
  'js/controllers/main_controller.js',
  'js/controllers/task_controller.js',
  'images/icons/list.png',
  'images/icons/plus.png',
  'images/icons/times.png'
];


self.addEventListener('install', function(event) {
  // Perform install steps
  console.log("installing......")
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

    }).catch(function(error) {

    })
  );
});