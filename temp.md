```javascript
const CACHE_NAME = 'my-site-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

var FILES_TO_CACHE = [
  '/offline.html'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  )
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request)
    .catch(() => {
      return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match('offline.html');
          });
    })
  );
});
```



```
    window.addEventListener('DOMContentLoaded', function(){
      const plugin = document.createElement("script");
      plugin.setAttribute(
        "src",
        "/scripts/install.js"
      );
      plugin.async = true;
      document.head.appendChild(plugin);  
    })
```



```
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">


<li v-show="urldata!='Menu'" style="float:right;">
      <span><i id="btnInstall" class="fas fa-mobile-alt"></i></span>
    </li>
    
    
    
    
    search.vue
    
    #type01 {
  display: grid;
  width: 90%;
  margin-left: 20px;
  //   margin-right: 10px;
  // grid-template-columns: 1fr 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 145px;
}
.imgtag {
  margin-top: 38%;
  
```



<script type="text/javascript">
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration);
        }, function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }
  </script>