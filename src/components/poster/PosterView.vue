<script setup lang="ts">
import FlagIcon from '@/assets/icons/FlagIcon.vue'
import { ButtonTransparrent } from '../../components';

export interface IPosterProps {
    url: string
}

const props = defineProps<IPosterProps>()


</script>

<template>
    <div class="poster">
        <ButtonTransparrent class="flag">
            <FlagIcon />
        </ButtonTransparrent>
        <img :src="url"
             alt="text">
    </div>
</template>

<style scoped>
.poster {
    position: relative;
}

img {
    width: 130px;
    height: 190px;
}

.flag {
    position: absolute;
    top: 0;
    left: 0;
    color: white;
}
</style>
