<script>
    import VideoPreview from "./VideoPreview.svelte";
    let videoPromise = getVideoList();
    async function getVideoList() {
        const res = await fetch(`${window.localStorage.getItem("baseurl")}/api/video/?format=json`, {


        })

        if(res.ok) {
            return await res.json();
        } else {
            throw new Error(res.toString());
        }
    }
</script>

{#await videoPromise}
    Loading...
{:then videos}
    <div class="is-flex is-flex-wrap-wrap" style="gap: 10px !important;">
        {#each videos.data as video}
            <VideoPreview videoID="{video.youtube_id}"></VideoPreview>
        {/each}
    </div>
{:catch error}
    <p style="color: red">{error}</p>
{/await}
