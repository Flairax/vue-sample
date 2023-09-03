<script setup lang="ts">
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
        path: `/users`,
        title: `Users`
    },
]

</script>

<template>
    <header>
        <nav class="links">
            <RouterLink v-for="{ path, title } of routes"
                        :key="path"
                        :to="path"
                        class="link">{{ title }}</RouterLink>
        </nav>
    </header>
</template>

<style scoped>
header {
    height: 50px;
    border-bottom: 1px solid black;
}

nav {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 20px;
}
</style>
