<script>
  import VideoPreview from "./components/VideoPreview.svelte";
  import List from "./components/List.svelte";
  import {Link, Route, Router} from "svelte-routing";
  import Landing from "./components/Landing.svelte";
  import Video from "./components/Video.svelte";


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

  export let url;
</script>

<main>
  <Router url="{url}">
    <nav aria-label="main navigation" class="navbar" role="navigation">
      <div class="navbar-brand">
        <Link to="/" class="navbar-item">
          SmoothTube-FE
        </Link>
      </div>

      <div class="navbar-menu" id="navbarApp">
        <div class="navbar-start">
          <Link to="/list" class="navbar-item">
            List
          </Link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div style="padding: 20px;">
      <Route path="/"><Landing /></Route>
      <Route component="{List}" path="/list"></Route>
      <Route component="{Video}" path="/view/:videoID" />

    </div>
  </Router>
</main>

<style>


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
