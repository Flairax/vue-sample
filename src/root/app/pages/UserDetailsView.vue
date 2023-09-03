<script setup lang="ts">
import { useUserItemStore } from '@/entities/user/store/user.item.store';
import UseItemView from '@/entities/user/view/UserItemView.vue';
import { computed } from 'vue';
import { watch, defineProps } from 'vue'
import { useRoute, useRouter, } from 'vue-router'

const store = useUserItemStore();
const router = useRouter();
const props = defineProps<IUserDetailsRouteProps>();
const id = computed(() => props.id);

export interface IUserDetailsRouteProps {
  id: number;
}

// watch(useRoute(), (route) => {
//   console.log(route.params);

//   store.load()
// }, {
//   immediate: true
// });

console.log(id);

function goTo(id: number) {
  router.push(`${id}`);
}

</script>

<template>
  <button @click="goTo(1)">go to 1</button>
  <button @click="goTo(2)">go to 2</button>

  <UseItemView v-if="store.data"
               :value="store.data"></UseItemView>
  <div v-else>Not Yet Loaded</div>
</template>

<style scoped>
</style>
