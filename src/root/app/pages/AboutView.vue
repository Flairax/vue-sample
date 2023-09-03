<script setup lang="ts">

interface IComponentProps {
  title: string;
  placeholder?: string;
}

const props = defineProps<IComponentProps>();
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

function emitChange() {
  emit(`change`, 3)
}

</script>

<template>
  <h4>{{ title }}</h4>
  <button @click='emitChange'>Change</button>
</template>

<style scoped>
  button {
    border: none;
  }
</style>
