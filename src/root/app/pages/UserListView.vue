<script setup lang="ts">

import { RouterLink } from 'vue-router';






</script>

<template>
  <div></div>
  <!-- <button @click="store.load">Load Users</button>

  <div class="list">
    <div v-for="{ id, name, age } of store.data"
         :key="id"
         class="item">
      <RouterLink :to="'users/' + id">
        <div>Name: {{ name }}</div>
        <div>Age: {{ age }}</div>
      </RouterLink>
    </div>
  </div> -->
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item {
  border: 1px solid black;
  transition: .2s;
}

.item:hover {
  background-color: rgb(117, 219, 117);
  cursor: pointer;
}
</style>
@/entities/user/user.list.store
@/entities/user/store/user.list.store
