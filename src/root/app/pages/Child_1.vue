<script setup lang="ts">
import { inject, provide, onMounted } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import Child_2 from './Child_2.vue'

const test = inject(`test`);
const route = useRoute()


onMounted(() => console.log(1));
onMounted(() => console.log(2));

onBeforeRouteLeave(() => {
  console.log(`Leave child_1`);
  
})

</script>

<template>
  <div>{{ test }}</div>
  <Child_2></Child_2>
</template>

<style scoped>
</style>
