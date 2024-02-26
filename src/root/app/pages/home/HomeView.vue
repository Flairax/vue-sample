<script setup lang="ts">
import { TableView, stringControl, type ITableProps, HttpState } from '@/components';
import { StringInput, type IStringInputProps } from '@/components/inputs';
import { AHttpRequest } from '@/utils';
import { computed, ref, onMounted } from 'vue';
import { z } from 'zod';
import CarouselView from './CarouselView .vue';
import TrailersView from './TrailersView.vue';


</script>

<template>
  <div>
    <div class="row-1">
      <CarouselView />
      <TrailersView />
    </div>


  </div>
</template>

<style lang="scss" scoped>
  .row-1 {
    display: flex;
    justify-content: center;
    gap: var(--gap-block);
  }
</style>
