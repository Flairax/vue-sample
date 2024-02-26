<script setup lang="ts">
import { provide } from 'vue'
import Child_1 from './Child_1.vue'

provide(`test`, 111)

</script>

<template>
  <Child_1 />
</template>

<style scoped>

</style>
