<style>
    @import "video.js/dist/video-js.min.css";
</style>
<video class="video-js"
       id="player-{id}"
       poster={thumbnail}
       style="max-height: 720px; max-width: 1080px"
       height="720"
       width="1080">
    <source src={mediaurl}>
</video>

<script>
    import videojs from "video.js";
    import "videojs-css";
    import {afterUpdate, tick} from "svelte";

    export let thumbnail;
    export let mediaurl;
    let player;

    let id = (Math.random() + 1).toString(36).substring(7);

    function loadPlayer() {
        player = videojs("player-"+id, {
            controls: true,
            autoplay: false,
            preload: "metadata"
        });
        player.css({
            controlBar:{
                borderRadius: "20px",
                marginBottom: "15px",
                width:"90%",
                marginLeft:"5%",
                fontSize:"1.5em",
                background:"#094a78"
            },
            bigPlayButton:{
                borderRadius: "10%",
                width:"150px",
                height:"150px",
                lineHeight:"150px",
                fontSize:"80px",
                border:"none",
                left:"50%",
                top:"50%",
                transform:"translate(-50%,-50%)",
                background:"#1267bb"
            },

        });
        console.log("videojs player initialized")
    }

    tick().then(loadPlayer)
</script>
