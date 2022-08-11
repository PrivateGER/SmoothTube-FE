let authToken = "";
let baseURL = "egklesmg";

const swBroadcast = new BroadcastChannel("swBroadcast");
swBroadcast.onmessage = function (event) {
    authToken = event.data.authToken;
    baseURL = event.data.baseURL;

    console.log("Set auth token to " + authToken);
    console.log("Set baseurl to " + baseURL);
}

self.addEventListener('fetch', event => {
    if (!event.request.url.startsWith(baseURL)) {
        console.log("Didn't intercept request to " + event.request.url)
        return
    }
    event.respondWith(customHeaderRequestFetch(event))
})

self.addEventListener("message", (evt) => {
    if (evt.data.startsWith("auth")) {
        let newToken = evt.data.replace("auth", "");
        console.log("Set auth token to " + newToken + ", old " + authToken)
        authToken = newToken;
    } else if (evt.data.startsWith("base")) {
        let newBase = evt.data.replace("base", "");
        console.log("Set baseurl to " + newBase + ", old " + baseURL)
        baseURL = newBase
    }
})

function customHeaderRequestFetch(event) {
    const newRequest = new Request(event.request, {
        headers: {
            ...event.headers,
            'Authorization': `Token ${authToken}`,
            'Access-Control-Request-Headers': 'Authorization'
        },
        mode: "cors",
        credentials: "include"
    })
    console.log("Intercepted request to " + event.request.url)
    return fetch(newRequest)
}

self.addEventListener('install', () => {
    self.skipWaiting(); //tells service worker to skip installing and activate it
});

self.addEventListener('activate', () => {
    clients.claim();
});