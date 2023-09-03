<script setup lang="ts" >
import { watch } from 'vue';
import type { IRangeInputProps } from './rangeInput.props';
import { getInputCtx } from '../_core/getCtx';
import { castNumber } from '..';

const props = defineProps<IRangeInputProps>();
const { id, value, label, validation } = getInputCtx(props)

</script>

<template>
   <input type="text">
</template>

<style scoped>
</style>
