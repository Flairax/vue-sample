
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import videojs from 'video.js';

export interface IVideoProps {
    url: string;
}

const props = defineProps<IVideoProps>()
const emit = defineEmits<{
    (e: `close`): void
}>()
const playerDom = ref<HTMLVideoElement>()
let player: ReturnType<typeof videojs>

onMounted(() => {
    playerDom.value?.play();
    // player.pla

    // player = videojs(element, {
    //     videoOptions: {
    //         autoplay: true,
    //         controls: true,
    //         sources: [
    //             {
    //                 src: 'https://download-video.akamaized.net/v3-1/playback/5bcd1566-4d0e-4e7b-8803-eabf22e6e6d8/b21811da-b85a1e92?__token__=st=1702068808~exp=1702083208~acl=%2Fv3-1%2Fplayback%2F5bcd1566-4d0e-4e7b-8803-eabf22e6e6d8%2Fb21811da-b85a1e92%2A~hmac=0ddf73bee1b9b03e402dde324fccfb1fc5509eb86747f6562ebbfb013552ffae&r=dXMtd2VzdDE%3D',
    //                 type: 'video/mp4'
    //             }
    //         ]
    //     }
    // }, () => {
    //     player.log('onPlayerReady', this);
    // });
})

onUnmounted(() => {
    // player.dispose();
})

function playPause() {
    if (playerDom.value?.paused)
        playerDom.value?.play();
    else
        playerDom.value?.pause();
}

async function fullscreen() {
    const res = await playerDom.value?.requestFullscreen()
    console.log(res);

}
</script>

<template>
    <div class="video">
        <video ref="playerDom">
            <source src="https://download-video.akamaized.net/v3-1/playback/5bcd1566-4d0e-4e7b-8803-eabf22e6e6d8/b21811da-b85a1e92?__token__=st=1702068808~exp=1702083208~acl=%2Fv3-1%2Fplayback%2F5bcd1566-4d0e-4e7b-8803-eabf22e6e6d8%2Fb21811da-b85a1e92%2A~hmac=0ddf73bee1b9b03e402dde324fccfb1fc5509eb86747f6562ebbfb013552ffae&r=dXMtd2VzdDE%3D"
                    type="video/mp4"
                    class="test">

            <div class="error">Your browser doesn't support html5 videos</div>
        </video>
        <div class="controls">
            <button @click="playPause">Play</button>
            <button @click="fullscreen">Full</button>
            <button @click="emit(`close`)">Close</button>

        </div>
    </div>

    <!-- <video ref="playerDom"></video> -->
</template>

<style scoped lang="scss">
.video {
    position: relative;
}

video {
    width: 100%;
}

.controls {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
}
</style>
