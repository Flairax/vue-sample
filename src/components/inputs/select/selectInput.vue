<script setup lang="ts" generic="T">
import { getRuntimeId } from '@/utils';
import { watch } from 'vue';
import type { ISelectInputProps } from './selectInput.props';
import { getInputCtx } from '../_core/getCtx';

const props = defineProps<ISelectInputProps<T>>();
const { id, value, label, validation } = getInputCtx(props)

 
</script>

<template>
    <input type="text">
</template>

<style scoped>
</style>
@/utils/other/id
