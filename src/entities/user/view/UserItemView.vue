<script setup lang="ts">
import type { IUser } from '../model/user.model';
import { onUpdated } from 'vue'

const { value } = defineProps<{ value: IUser }>();


onUpdated((curr, prev) => {
  console.log({ curr, prev });

})
</script>

<template>
  <div class="container">
    <div>Name: {{ value.name }}</div>
    <div>Age: {{ value.age }}</div>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
  border: 1px solid black;
}
</style>
