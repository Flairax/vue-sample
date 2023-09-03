<script setup lang="ts" generic="T, F">
import { onMounted, ref, watch } from 'vue';
import type { ICheckboxInputCtx } from './checkboxInput.ctx';


const props = defineProps<{ ctx: ICheckboxInputCtx<T, F> }>();
const { title, value, truthy, falsy } = props.ctx;

watch(value, console.log)

</script>

<template>
    <input type="checkbox"
           v-model="value"
           :true-value="truthy"
           :false-value="falsy"
           :name="title"
           :id="title">
    <label :for="title">{{ title }}</label>
</template>

<style scoped>
</style>
