<script>
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
  import Video from "./components/VideoPreview.svelte";
  import VideoPreview from "./components/VideoPreview.svelte";
  import Search from "./components/Search.svelte";

  window.addEventListener('load', () => {
    if (!('serviceWorker' in navigator)) {
      console.error("SW not supported")
      return
    }

    navigator.serviceWorker.register('/sw.js').then(
      () => {
        console.log("SW registered")

      },
      err => {
        console.error('SW registration failed! 😱', err)
      }
    )

    navigator.serviceWorker.ready
      .then((reg) => reg.update())
      .then((reg) => {
        reg.update()
        if (reg.active) {
          reg.active.postMessage(`auth${window.localStorage.getItem("token")}`);
          reg.active.postMessage(`base${window.localStorage.getItem("baseurl")}`)
        }
      })
  })
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>

  <Search></Search>
</main>

<style>
  @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.css";
  @import "https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css";

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }

</style>
