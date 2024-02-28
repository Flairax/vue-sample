<script setup lang="ts">
import { AUTH, ProfileService } from '@/entities'
import AppSearch from './AppSearch.vue'
const profile = ProfileService.inject()

</script>

<template>
  <header>
    <div class="logo">AHML</div>
    <div class="menu">
      <div class="app-icon"></div>
      <div>Menu</div>
    </div>
    <AppSearch class="search" />
    <div class="subscription">SBCR</div>
    <div class="watchlist"></div>
    <div class="signin">

      <button @click="AUTH.clear">Signout</button>
    </div>
    <div class="localization">EN</div>
    <div class="localization">{{ profile.state.value.data }}</div>
  </header>
</template>

<style scoped>
header {
  height: var(--header-height);
  background-color: var(--cl-black-2);
  display: flex;
  align-items: center;
  gap: var(--gap-block);
  padding: 0 calc(var(--gap-block) * 2);
}

nav {
  display: flex;
  height: 100%;
  align-items: center;
  gap: 20px;
}

.menu {
  display: flex;
}

.menu-icon {
}

.search {
  flex-grow: 1;
}
</style>
