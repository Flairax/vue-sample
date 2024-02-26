<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from './layout/AppHeader.vue';
import AppFooter from './layout/AppFooter.vue';
</script>

<template>
    <AppHeader />
    <div class="content">
        <RouterView />
    </div>
    <AppFooter />
</template>

<style scoped lang="scss">
.content {
    height: calc(100% - (var(--header-height) + var(--footer-height)));
    padding: var(--gap-block);
}
</style>
