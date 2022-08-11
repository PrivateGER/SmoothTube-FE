<script>

    import Player from "./Player.svelte";

    export let videoID;
    let player;

    let videoPromise = getVideoInfo(videoID);
    async function getVideoInfo(id) {
        const res = await fetch(`${window.localStorage.getItem("baseurl")}/api/video/${id}/?format=json`)

        if(res.ok) {
            return await res.json();
        } else {
            throw new Error(res);
        }
    }
    function prefixURL(resource) {
        return `${window.localStorage.getItem('baseurl')}${resource}`
    }
    function thirdPartyViewer(id) {
        return localStorage.getItem("tpviewer").replace("%VIDEOID%", id);
    }
</script>

{#await videoPromise}
    <progress class="progress is-large is-info" max="100">60%</progress>
{:then video}
    <div class="box">
        <Player thumbnail={ prefixURL(video.data.vid_thumb_url) } mediaurl={ prefixURL(video.data.media_url) }></Player>

        <h1 class="title" style="margin-top: 10px">{ video.data.title }</h1>
        <p class="subtitle">{ video.data.channel.channel_name }</p>

        <div class="block">
            <a href="{ `https://youtube.com/watch?v=${video.data.youtube_id}` }" target="_blank">
                <button class="button is-primary has-icons-left">
                    <span class="icon is-small">
                        <i class="fa-brands fa-youtube"></i>
                    </span>
                    <span>View on YouTube</span>
                </button>
            </a>
            <a href="{ thirdPartyViewer(video.data.youtube_id) }" target="_blank">
                <button class="button is-primary has-icons-left">
                    <span class="icon is-small">
                        <img src="/invidious.png">
                    </span>
                    <span>View on third-party viewer</span>
                </button>
            </a>
        </div>

        <article class="message is-link">
            <div class="message-header">
                <p>Metadata</p>
            </div>
            <div class="message-body">
                Category: <span class="tag is-success">{ video.data.category.join(" ") }</span>
                <br><br />
                <div class="tags">
                    Tags:&nbsp;
                    {#each video.data.tags as tag}
                        <span class="tag is-primary">{ tag }</span>
                    {/each}
                </div>
            </div>
        </article>

        <article class="message is-info">
            <div class="message-header">
                <p>Description</p>
            </div>
            <div class="message-body" style="white-space: pre-line;">
                { video.data.description }
            </div>
        </article>
    </div>
    <script>

    </script>
{:catch error}
    <p style="color: red">{error}</p>
{/await}

