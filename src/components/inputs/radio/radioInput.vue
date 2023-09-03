<script setup lang="ts" generic="T">
import { computed } from 'vue';
import type { IRadioInputProps } from './radioInput.ctx';
import { getRuntimeId } from '@/utils';

const props = defineProps<IRadioInputProps<T>>();

const mapped = computed(() => {
    return props.options.map(value => ({
        id: getRuntimeId(),
        title: props.getTitle(value),
        value
    }))
});


</script>
<template >
    <div>


        <!-- <template v-for="{ id, title, value } of mapped"
                  :key="title">
            <input type="radio"
                   v-model="props.selected"
                   :value="value"
                   :name="title"
                   :id="id">
            <label :for="id">{{ title }}</label>
        </template> -->
    </div>
</template>
<style scoped>
</style>
@/utils/other/id
