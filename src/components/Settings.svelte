<script>
    // determines whether service worker is ready for use
    function swReady() {
        if ('serviceWorker' in navigator) {
            return !!navigator.serviceWorker.controller;
        } else {
            return false;
        }
    }

    function saveConfig() {
        localStorage.setItem("token", token);
        localStorage.setItem("baseurl", baseurl);
        localStorage.setItem("tpviewer", thirdpartyviewer);
        window.location.reload();
    }

    let token;
    let baseurl;
    let thirdpartyviewer;

    if (localStorage.getItem("token") != null && localStorage.getItem("baseurl") !== "") {
        token = localStorage.getItem("token");
    }
    if (localStorage.getItem("baseurl") != null && localStorage.getItem("baseurl") !== "") {
        baseurl = localStorage.getItem("baseurl");
    }
    if (localStorage.getItem("tpviewer") != null && localStorage.getItem("tpviewer") !== "") {
        thirdpartyviewer = localStorage.getItem("tpviewer");
    } else {
        // default third-party viewer, hosted by yours truly :3
        thirdpartyviewer = "https://invidious.plasmatrap.com/watch?v=%VIDEOID%";
    }
</script>

<div class="card">
    <div class="card-header">
        <p class="card-header-title">Settings</p>
    </div>
    <div class="card-content">
        <div class="field">
            <label class="label">Access Token</label>
            <div class="control">
                <input type="text" class="input" placeholder="Access Token" bind:value={token} maxlength="40" minlength="40" required>
            </div>
        </div>

        <div class="field">
            <label class="label">Base URL without trailing slash (ex: https://tubearchivist.local)</label>
            <div class="control">
                <input type="url" class="input" placeholder="Base URL (without trailing slash)" bind:value={baseurl} required>
            </div>
        </div>

        <div class="field">
            <label class="label">URL to a third-party YouTube viewer</label>
            <div class="control">
                <input type="url" class="input" placeholder="URL in which %VIDEOID% will be substituted" bind:value={thirdpartyviewer} required>
            </div>
        </div>

        <button class="button is-primary has-icons-left" on:click={saveConfig}>
            <span class="icon is-small">
                <i class="fa-solid fa-floppy-disk"></i>
            </span>
            <span>Save</span>

        </button>
    </div>
</div>

<br />

{#if swReady()}
    <article class="message is-success">
        <div class="message-header">
            <p>Service Worker Status</p>
        </div>
        <div class="message-body">
            <p><i class="fa-solid fa-circle-check"></i> Service Worker is loaded and running.</p>
        </div>
    </article>
{:else}
    <article class="message is-danger">
        <div class="message-header">
            <p>Service Worker Status</p>
        </div>
        <div class="message-body">
            <p><i class="fa-solid fa-circle-xmark"></i> Service Worker is not loaded or not supported. Try to reload the page (without a hard refresh).</p>
        </div>
    </article>
{/if}