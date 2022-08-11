<script>
  import VideoPreview from "./components/VideoPreview.svelte";
  import List from "./components/List.svelte";
  import {Link, Route, Router} from "svelte-routing";
  import Landing from "./components/Landing.svelte";
  import Video from "./components/Video.svelte";
  import Settings from "./components/Settings.svelte";

  let url;
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
          <Link to="/list/1" class="navbar-item">
            List
          </Link>
          <Link to="/settings" class="navbar-item">
            Settings
          </Link>
        </div>
      </div>
    </nav>
    <div style="padding: 20px;">
      <Route path="/"><Landing /></Route>
      <Route component="{List}" path="/list/:pageIndex"></Route>
      <Route component="{Video}" path="/view/:videoID" />
      <Route component="{Settings}" path="/settings" />
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
