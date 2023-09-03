<script setup lang="ts" generic="T">
import type { IReadonlyHttpRequest } from '../../utils'

const props = defineProps<{
    request: IReadonlyHttpRequest<T>
}>()

const state = props.request.state;
</script>

<template>
    <div v-if="state.initial">Initial</div>
    <div v-else-if="state.loading">
        <div v-if="state.delayed">
            Delayed
        </div>
        <div v-else>Loading</div>
    </div>
    <div v-else-if="state.error">Error</div>
    <div v-else-if="state.ready">
        <slot :data="state.data"></slot>
    </div>
    <div v-else>Unknown state</div>
</template>

<style scoped>
</style>
