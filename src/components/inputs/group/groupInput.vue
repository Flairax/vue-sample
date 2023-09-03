<script setup lang="ts" generic="T extends object">
import { getRuntimeId } from '@/utils';
import { watch } from 'vue';
import type { IGroupInputProps } from './groupInput.props';

const props = defineProps<IGroupInputProps<T>>();
const id = getRuntimeId();
const basic = { value: props.default };

</script>

<template>
    <input type="text">
    <!-- <FormKit type="form"
             #default="basic"
             @submit="props.submit">
        <slot />
    </FormKit> -->
</template>

<style scoped>
</style>
@/utils/other/id
