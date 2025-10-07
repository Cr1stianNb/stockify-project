
<template>
  <div class="flex flex-col w-full h-dvh overflow-y-auto">
    <ProductView v-if="props.subView === InventorySubItems.PRODUCT" />
    <CategoryView v-if="props.subView === InventorySubItems.CATEGORY" />
    <MovementView v-if="props.subView === InventorySubItems.MOVEMENT" />
  </div>
</template>

<script setup>

import CategoryView from '@/components/Inventory/CategoryView.vue';
import MovementView from '@/components/Inventory/MovementView.vue';
import ProductView from '@/components/Inventory/ProductView.vue';
import { InventorySubItems } from '@/enums/InventorySubItem'

const props = defineProps({
  subView: String
});



</script>