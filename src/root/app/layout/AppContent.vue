<script setup lang="ts">
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';



</script>

<template>
    <AppHeader></AppHeader>
    <main>
        <RouterView />
    </main>
    <!-- <AppSidebar></AppSidebar> -->
    <AppFooter></AppFooter>
</template>

<style scoped>
main {
    height: calc(100vh - 100px);
}
</style>
