var dataCacheName = 'CallerApi';
var current_id = '';
var owner_id = '';
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

self.addEventListener('activate', event => {
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
    const link = 'https://hackthon-c4508.firebaseapp.com/' + owner_id + '/' + current_id;
    if (action !== 'close') {
        clients.openWindow(link);
    }
    notification.close();
    console.log('notificationclick action is', action);
})

// https://web-push-codelab.glitch.me/ get key
const title = 'Time is up';
const options = {
    body: 'Appointment time is up',
    icon: './image/icon.png'
};
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
    current_id = JSON.parse(event.data.text())
    current_id = current_id.current_id
    // Send a message to the client.
    // debugger
    if (isNaN(current_id) && isNaN(owner_id)){
      if(owner_id - current_id - 1<=0)
        event.waitUntil(self.registration.showNotification(title, options));
    }
});

self.addEventListener('message', function(event) {
    owner_id = event.data
});

document.write('<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA-m24h4mwgeSkMpaQenjQNiPeAK5VLWjk&sensor=false"></script>');
setInterval(getGoogleMapAPIAndUpdateUI, 120000);

function getGoogleMapAPIAndUpdateUI() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var origin1 = new google.maps.LatLng(latitude, longitude);
        var destinationB = new google.maps.LatLng(24.068176, 120.700916);
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin1],
            destinations: [destinationB],
            travelMode: 'WALKING',
            unitSystem: google.maps.UnitSystem.METRIC,
        }, function callback(response, status) {
            data = response.rows[0].elements[0]
            if (isNaN(current_id) && isNaN(owner_id)) {
                site_time = data.duration.value
                id_time = (owner_id - current_id - 1) * 5 * 60
                if (id_time <= site_time)
                    self.registration.showNotification(title, options)
            }
        });
    }, function(err) {
        console.log(err)
    });
}

// self.clients.matchAll()
//     .then(function (clients) {
//         if (clients && clients.length) {
//             clients.forEach(function (client) {
//                 // 发送字符串'sw.update'
//                 client.postMessage('sw.update');
//             })
//         }
//     })