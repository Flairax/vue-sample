<script setup lang="ts" >
import { getRuntimeId } from '@/utils';
import { getInputCtx } from '../_core/getCtx';
import { watch, onUpdated } from 'vue';
import type { IStringInputProps } from './stringInput.props';
import { computed } from 'vue';

const props = defineProps<IStringInputProps>();
const { id, control, label, validation } = getInputCtx(props)

console.log(control);
const c = computed(() => {
   const a = control.data.value;
   console.log(a);
   return a

})



const errors = [`No`];
</script>

<template>
   <label :for="id">{{ label }}</label>
   <input type="text"
          v-model="control.data"
          :id="id"
          :aria-invalid="!!errors.length"
          :aria-describedby="errors.length ? `${id}-errors` : undefined">

   <div v-if="errors.length" :id="`${id}-errors`" aria-live="assertive">
      <p v-for="error of errors"
         :key="error">
         {{ error }}
      </p>
   </div>
</template>

<style scoped>
</style>
