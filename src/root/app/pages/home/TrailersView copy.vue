<script setup lang="ts">
import { ref } from 'vue';
import { PosterView, ButtonTransparrent } from '@/components';
import PlayIcon from '@/assets/icons/PlayIcon.vue';
import ArrowSmallIcon from '@/assets/icons/ArrowSmallIcon.vue';

const trailers = ref([
    {
        id: 1,
        poster: `https://m.media-amazon.com/images/M/MV5BNDYwOWUyMDItZTlkZi00YzYxLThlMmMtMzM5Yzk2NjVkZDliXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_QL75_UX140_CR0,0,140,207_.jpg`,
        description: `Bring on the New Holiday Movies`,
        callout: `Celebrate With 5 Streamable Picks`,
        duration: 100,
    },
    {
        id: 2,
        poster: `https://m.media-amazon.com/images/M/MV5BZmU5MzcwNjAtOWJjMC00N2FiLWJiM2MtOGI4MDA2ZjY2YjExXkEyXkFqcGdeQXVyNzI1MTM3Njg@._V1_QL75_UX140_CR0,0,140,207_.jpg`,
        description: `Godzilla and Kong Face Scar King`,
        callout: `Watch the New Trailer`,
        duration: 100,
    },
    {
        id: 3,
        poster: `https://m.media-amazon.com/images/M/MV5BOWY2OGY3MjktMDA1Ny00NDJkLTllMTEtMWVhNjg1MWQ2YmQ3XkEyXkFqcGdeQXVyNDYzNjU3ODM@._V1_QL75_UX140_CR0,0,140,207_.jpg`,
        description: `From 'Superbad' to 'Poor Things'`,
        callout: `The Rise of Emma Stone`,
        duration: 100,
    }
])
function play() {

}

</script>

<template>
    <div class="trailers">
        <h3 class="title">Up Next</h3>
        <ul class="list">
            <li v-for="{ id, poster, description, callout } in trailers"
                :key="id"
                class="trailer"
                @click="play()">
                <img :src="poster"
                     alt="text"
                     class="poster">
                <div class="info">
                    <div class="controls">
                        <ButtonTransparrent>
                            <PlayIcon class="play-icon" />
                        </ButtonTransparrent>
                    </div>
                    <div class="text">
                        <div class="description">{{ description }}</div>
                        <div class="app-text-s">{{ callout }}</div>
                    </div>
                </div>
            </li>
        </ul>
        <ButtonTransparrent @click="play()">
            <h3 class="browse">
                <span>Browse trailers</span>
                <ArrowSmallIcon />
            </h3>
        </ButtonTransparrent>
    </div>
</template>

<style  scoped>
.trailers {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    height: 450px;
    gap: var(--gap-block);
}

.title {
    color: var(--cl-accent);
    position: relative;
    top: -4px;
}

.list {
    display: flex;
    flex-direction: column;
    padding: var(--gap-content);
    gap: var(--gap-content);
    background: linear-gradient(0deg,
            transparent 0%,
            transparent 50%,
            rgba(var(--ipt-baseAlt-shade3-rgb, 18, 18, 18), 0.7) 78%,
            rgba(var(--ipt-baseAlt-shade3-rgb, 18, 18, 18), 1) 100%)
}

.trailer {
    background-color: rgb(0, 255, 110)(48, 44, 44);
    display: flex;
    gap: var(--gap-content);
    cursor: pointer;
}

.trailer:hover .play-icon {
    color: var(--cl-accent);
}

.info {
    display: flex;
    flex-direction: column;
    gap: var(--gap-content);
}

.browse {
    display: flex;
    padding-left: var(--gap-content);
    position: relative;
    top: 7px;
}

.controls {
    display: flex;
    gap: var(--gap-content);
    align-items: flex-end;
}

.play-icon {
    width: 32px;
    height: 32px;
    color: var(--cl-white-1);
    transition: var(--transition);
}

.poster {
    width: var(--poster-width);
    height: var(--poster-height);
}

</style>
