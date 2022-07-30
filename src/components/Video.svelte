<script>
    export let videoID;
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
</script>

{#await videoPromise}
    <progress class="progress is-large is-info" max="100">60%</progress>
{:then video}
    <div class="box">
        <video preload="metadata" src="{ prefixURL(video.data.media_url) }" poster="{ prefixURL(video.data.vid_thumb_url) }" style="max-height: 720px; max-width: 1080px" controls></video>

        <h1 class="title">{ video.data.title }</h1>
        <p class="subtitle">{ video.data.channel.channel_name }</p>

        <article class="message is-link">
            <div class="message-header">
                <p>Metadata</p>
                <button class="delete" aria-label="delete"></button>
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
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body" style="white-space: pre-line;">
                { video.data.description }
            </div>
        </article>
    </div>
{:catch error}
    <p style="color: red">{error}</p>
{/await}
