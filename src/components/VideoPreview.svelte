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
    function authFetchImage() {

    }
</script>

{#await videoPromise}
    Loading...
{:then video}
    <div>
        <div class="card" style="max-width: 290px; padding: 10px;">
            <div class="card-image">
                <figure class="image">
                    <a href="/view?id={ video.data.youtube_id }">
                        <img class="image" alt="Video thumbnail" style="width: 240px; height: 135px; margin-left: auto; margin-right: auto; display: block" src="{ prefixURL(video.data.vid_thumb_url) }">
                    </a>
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">{ video.data.title }</p>
                        <p class="subtitle is-6">{ video.data.channel.channel_name }</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
{:catch error}
    <p style="color: red">{error}</p>
{/await}
