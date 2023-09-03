<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface IRoute {
    path: string;
    title: string;
}

const routes: IRoute[] = [
    {
        path: `/`,
        title: `Home`
    },
    {
        path: `/about`,
        title: `About`
    },
]

</script>

<template >
    <aside class="sidebar">
        <nav class="links">
            <RouterLink v-for="{ path, title } of routes"
                        :key="path"
                        :to="path"
                        class="link">{{ title }}</RouterLink>
        </nav>
    </aside>
</template>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 200px;
    height: 100vh;
    background-color: gray;
    opacity: .5;
}

.links {
    display: flex;
    flex-direction: column;
}

.link {

}
</style>
