<script setup lang="ts">
import {inject} from 'vue'
import {onBeforeRouteLeave} from 'vue-router'

const test = inject(`test`);

onBeforeRouteLeave(() => {
  console.log(`Leave child_2`);
  
})
</script>

<template>
 <div>{{ test }}</div>
</template>

<style scoped>
  
</style>
