<script>
    import VideoPreview from "./VideoPreview.svelte";
    import {navigate} from "svelte-routing";
    export let pageIndex = 1;
    let maxPages = -1;

    if(pageIndex !== 1) {
        pageIndex = Number(pageIndex);
    }

    let videoPromise = getVideoList(pageIndex);

    async function getVideoList(page) {
        const res = await fetch(`${window.localStorage.getItem("baseurl")}/api/video/?format=json&page=${page}`);

        if(res.ok) {
            let json = await res.json();
            if (maxPages === -1) maxPages = json.paginate.last_page;

            return json;
        } else {
            throw new Error(res.toString());
        }
    }

    function showPage(page) {
        navigate("/list/" + page);
        videoPromise = getVideoList(page);
        pageIndex = page;
    }

    function disablePrev() {
        return pageIndex === 1;
    }

    function disableNext() {
        return pageIndex === maxPages;
    }

</script>



{#await videoPromise}
    <progress class="progress is-large is-info" max="100">60%</progress>
{:then videos}
    <!--<div class="is-flex is-flex-wrap-wrap" style="gap: 10px !important;">
        {#each videos.data as video}
            <VideoPreview videoID="{video.youtube_id}"></VideoPreview>
        {/each}
    </div>-->

    <div class="columns is-multiline">
        {#each videos.data as video}
            <div class="column is-one-fifth">
                <VideoPreview videoID="{video.youtube_id}"></VideoPreview>
            </div>
        {/each}
    </div>

    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
            <li><a class="pagination-link" aria-label="Goto page 1" on:click={() => showPage(1)}>1</a></li>
            <li><span class="pagination-ellipsis">&hellip;</span></li>

            <li><button class="pagination-link button"
                        disabled={disablePrev()}
                        on:click={() => showPage(Number(pageIndex)-1)}>
                {Number(pageIndex)-1}
            </button></li>
            <li><button class="pagination-link is-current button" aria-current="page">{pageIndex}</button></li>
            <li><button class="pagination-link button"
                        disabled={disableNext()}
                        on:click={() => showPage(Number(pageIndex)+1)}>
                {Number(pageIndex)+1}
            </button></li>

            <li><span class="pagination-ellipsis">&hellip;</span></li>
            <li><a class="pagination-link" aria-label="Goto page 86" on:click={() => showPage(maxPages)}>{ maxPages }</a></li>
        </ul>
    </nav>
{:catch error}
    <p style="color: red">{error}</p>
{/await}

