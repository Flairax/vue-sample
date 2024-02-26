<script setup lang="ts">

</script>

<template>
    <button>
        <slot />
    </button>
</template>

<style scoped lang="scss">
button {
    display: flex;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    color: inherit;
}
</style>
