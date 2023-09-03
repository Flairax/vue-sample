<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { ICheckboxMultiInputCtx } from './checkboxMultiInput.ctx';


const props = defineProps<{ ctx: ICheckboxMultiInputCtx<T> }>();
const { selected, options, getTitle } = props.ctx;
const titled = computed(() => {
    return options.value.map(value => ({
        title: getTitle(value),
        value
    }))
});

</script>
<template >
    <template v-for="{ title, value } of titled"
              :key="title">
        <input type="checkbox"
               v-model="selected"
               :value="value"
               :name="title"
               :id="title">
        <label :for="title">{{ title }}</label>
    </template>
</template>
<style scoped>
</style>
