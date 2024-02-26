<script setup lang="ts">
import { computed, ref, onUnmounted, watch } from 'vue';
import { ButtonTransparrent, PosterView, VideoView } from '@/components';
import PlayIcon from '@/assets/icons/PlayIcon.vue';
import ArrowIcon from '@/assets/icons/ArrowIcon.vue';




const slides = ref([
    {
        id: 1,
        title: `Austin Butler in "Masters of the Air"`,
        callout: ``,
        poster: `https://m.media-amazon.com/images/M/MV5BZDBkOTA2YjEtYjJjZi00NzE1LTkwYTUtYTVkZGFiZDIxM2I5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX140_CR0,1,140,207_.jpg`,
        shot: `https://m.media-amazon.com/images/M/MV5BOWM0ZWI3ZWItNDYyMy00OGUxLTg5NmEtNjQ4YmUwOTA5YjQ3XkEyXkFqcGdeQWpnYW1i._V1_QL40_QL75_UX500_CR0,0,500,281_.jpg`,
        video: `https://www.youtube.com/embed/tgbNymZ7vqY`,
    },
    {
        id: 2,
        title: `Bring on the New Holiday Movies`,
        callout: ``,
        poster: `https://m.media-amazon.com/images/M/MV5BNDYwOWUyMDItZTlkZi00YzYxLThlMmMtMzM5Yzk2NjVkZDliXkEyXkFqcGdeQXVyNjMwMzc3MjE@._V1_QL75_UX140_CR0,0,140,207_.jpg`,
        shot: `https://m.media-amazon.com/images/M/MV5BZWJjZjhiNWYtMWIyNy00Y2MxLTgyZTgtMGFhYzUzMGU1MmNkXkEyXkFqcGdeQXJoYW5uYWg@._V1_QL40_QL75_UX500_CR0,0,500,281_.jpg`,
        video: ``,
    },
    {
        id: 3,
        title: `Godzilla and Kong Face Scar King`,
        callout: ``,
        poster: `https://m.media-amazon.com/images/M/MV5BZmU5MzcwNjAtOWJjMC00N2FiLWJiM2MtOGI4MDA2ZjY2YjExXkEyXkFqcGdeQXVyNzI1MTM3Njg@._V1_QL75_UX140_CR0,0,140,207_.jpg`,
        shot: `https://m.media-amazon.com/images/M/MV5BYjYzZjRhYzgtNzJhNS00ZTEwLTg0ZTAtMWQ3MTk3YThhNzJiXkEyXkFqcGdeQWRvb2xpbmhk._V1_QL40_QL75_UX500_CR0,0,500,281_.jpg`,
        video: `https://www.youtube.com/watch?v=lV1OOlGwExM`,
    },
])

const intervalId = setInterval(() => next, 1000)
const slide = ref(slides.value[0])
const direction = ref(`right`)
const video = ref(false)

onUnmounted(() => {
    clearInterval(intervalId)
})

function play() {
    video.value = true
}

function next() {
    const index = slides.value.indexOf(slide.value)
    const next = index === slides.value.length - 1 ? 0 : index + 1
    direction.value = `right`
    slide.value = slides.value[next];
}

function prev() {
    const index = slides.value.indexOf(slide.value)
    const next = index === 0 ? slides.value.length - 1 : index - 1
    direction.value = `left`
    slide.value = slides.value[next];
}
</script>

<template>
    <div class="wrapper">
        <VideoView v-if="video"
                   :url="slide.video"
                   class="video"
                   @close="video = false" />
        <Transition v-else
                    name="up">
            <div class="carousel">
                <ButtonTransparrent class="arrow left"
                                    @click="prev()">
                    <ArrowIcon class="arrow-icon" />
                </ButtonTransparrent>
                <div class="slides">
                    <Transition :name="'slide-' + direction">
                        <div :key="slide.id"
                             class="slide">
                            <img :src="slide.shot"
                                 class="shot"
                                 alt="">
                            <div class="info">
                                <PosterView :url="slide.poster"
                                            class="poster" />
                                <div class="link">
                                    <ButtonTransparrent @click="play()">
                                        <PlayIcon class="play-icon" />
                                    </ButtonTransparrent>
                                    <div class="description">
                                        <div class="title">{{ slide.title }}</div>
                                        <div class="addd app-text-s">Watch new trailer</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
                <ButtonTransparrent class="arrow right"
                                    @click="next()">
                    <ArrowIcon class="arrow-icon" />
                </ButtonTransparrent>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    width: 650px;
    height: 450px;
    overflow: hidden;
}

.carousel {
    position: relative;
    background: linear-gradient(180deg, transparent 0, transparent 65%, rgba(0, 0, 0, .35) 83.5%, rgba(0, 0, 0, .75));
}

.slides {
    display: flex;
    width: 650px;
    overflow: hidden;
    position: relative;
}

.slide {
    width: 650px;
    height: 450px;
    z-index: 1;
    transition: transform var(--transition) ease;
}

.slide-right-enter-from {
    z-index: 0;
    transform: translateX(-100%);
}

.slide-right-leave-to {
    position: absolute;
    transform: translateX(100%);
}

.slide-left-enter-from {
    z-index: 0;
    transform: translateX(100%);
}

.slide-left-leave-to {
    position: absolute;
    transform: translateX(-100%);
}

.up-leave-to {
    // position: absolute;
    transform: translateY(-100%);
    transition: transform 2s ease;
}


.poster {
    z-index: 3;
}

.shot {
    width: 650px;
    height: 380px;
}

.play-icon {
    width: 72px;
    height: 72px;
    color: var(--cl-white-1);
    transition: var(--transition);
}

.info {
    display: flex;
    align-items: flex-end;
    gap: var(--gap-block);
    padding: 0 var(--gap-block);
    width: 100%;
    position: absolute;
    bottom: 0px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.88763427734375) 35%, rgba(0, 0, 0, 0) 80%);
}

.title {
    font-size: 2.4rem;
}

.addd {
    font-size: 2rem;
}

.video {}

.arrow {
    position: absolute;
    z-index: 2;
    height: 80%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    cursor: pointer;
    background: rgb(0, 0, 0);
    background: linear-gradient(270deg, rgba(0, 0, 0, 0.40304043980873594) 40%, rgba(0, 0, 0, 0) 100%);

    &:hover .arrow-icon {
        color: var(--cl-accent);
    }

    &.left {
        left: 0;
        transform: rotate(180deg);
    }

    &.right {
        right: 0;
    }

    .arrow-icon {
        opacity: .7;
        transition: var(--transition);
    }
}
</style>
