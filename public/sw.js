var dataCacheName = 'CallerApi';
// import require from 'require';
var cacheName = 'Caller';
var filesToCache = [
    './',
    './index.html',
    './bootstrap.min.js',
    './bootstrap.css',
    './api.json',
    './image/small.png',
    './image/middle.png',
    './image/danger.png',
];
// during the install phase you usually want to cache static assets
self.addEventListener('install', e => {
  console.log('[Service Worker] Install');
  // once the SW is installed, go ahead and fetch the resources to make this work offline
  // e.waitUntil(
  //   // caches.open(cacheName).then(function(cache) {
  //   //   console.log('[Service Worker] Caching App Shell');
  //   //   return cache.addAll(filesToCache);
  //   // })
  // );
});

self.addEventListener('activate',  event => {
    console.log('[Service Worker] Activate');
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          console.log('[Service Worker] Removing old cache', key);
          if (key !== cacheName) {
            return caches.delete(key);
          }
        }));
      })
    );
});


// when the browser fetches a url
// self.addEventListener('fetch', function(e) {
//   console.log('[Service Worker] Fetch', e.request.url);
//   var dataUrl = 'https://hackthon-c4508.firebaseapp.com/api.json';
  
//   // either respond with the cached object or go ahead and fetch the actual url
//   if (e.request.url.indexOf(dataUrl) === 0) {
//     e.respondWith(
//       fetch(e.request)
//         .then(function(response) {
//           return caches.open(dataCacheName).then(function(cache) {
//             cache.put(e.request.url, response.clone());
//             console.log('[Service Worker] Fetched&Cached Data');
//             return response;
//           });
//         })
//     );
//   } else {
//     e.respondWith(
//       caches.match(e.request).then(function(response) {
//         return response || fetch(e.request);
//       })
//     );
//   }
// });

self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const action = event.action;
  // const link = notification.data.link;
  // if (action !== 'close') {
  //   if (link) {
  //     clients.openWindow(link);
  //   }
  // }

  notification.close();
  console.log('notificationclick action is', action);
})

// https://web-push-codelab.glitch.me/ get key

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = '通知';
  // data=JSON.parse(event.data.text())
  const options = {
    body: '編號已更新',
    icon: ''
  };

  
   
    // const client = await clients.get(event.clientId);
    // // Exit early if we don't get the client.
    // // Eg, if it closed.
    // if (!client) return;

   // Send a message to the client.
   // debugger
   event.waitUntil(self.registration.showNotification(title, options));
  // clients.matchAll({type:"window"}).then(function(e){
  //   // clients[0].postMesssage({
  //   // msg: event.data.text()
  //   // });
  //   console.log(e)
  // });
  
  
});


