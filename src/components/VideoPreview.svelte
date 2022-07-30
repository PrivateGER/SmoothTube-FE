<script>
    import {Link} from "svelte-routing";

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
    <div>
        <div class="card" style="max-width: 290px; padding: 10px;">
            <progress class="progress is-large is-info" max="100">60%</progress>
        </div>
    </div>
{:then video}
    <div>
        <div class="card" style="max-width: 290px; padding: 10px;">
            <div class="card-image">
                <figure class="image">
                    <Link to="/view/{ video.data.youtube_id }">
                        <img class="image" alt="Video thumbnail" style="width: 240px; height: 135px; margin-left: auto; margin-right: auto; display: block" src="{ prefixURL(video.data.vid_thumb_url) }">
                    </Link>
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
