<script setup lang="ts" generic="T extends object">
import { computed } from 'vue';
import type { ITableProps } from './tableView.props';

const props = defineProps<ITableProps<T>>();
const rows = computed(() => {
    return props.values.map(value => ({
        id: props.getId(value),
        value
    }));

});

</script>

<template>
    <vs-table>
        <template #thead>
            <vs-tr>
                <slot name="headers"></slot>
            </vs-tr>
        </template>
        <template #tbody>
            <vs-tr v-for="row in rows"
                   :key="row.id"
                   :data="row">
                <slot name="row" v-bind="row.value"></slot>
            </vs-tr>
        </template>
    </vs-table>
</template>

<style scoped>
</style>
