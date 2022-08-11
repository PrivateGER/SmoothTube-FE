import './app.css'
import App from './App.svelte'

if(window.localStorage.getItem("token") != null && window.localStorage.getItem("baseurl") !== null) {
    new BroadcastChannel("swBroadcast").postMessage({
        authToken: window.localStorage.getItem("token"),
        baseURL: window.localStorage.getItem("baseurl")
    })
}


const app = new App({
    target: document.getElementById('app'),
})

export default app
