
<template>
  <div class="flex flex-col w-full h-dvh overflow-y-auto">
    <ProductReport v-if="props.subView === ReportSubItem.PROFFIY_BY_PRODUCT" />
    <CategoryReport v-if="props.subView === ReportSubItem.PROFFIT_BY_CATEGORY" />
    <!--    <MovementView v-if="props.subView === 'null'" />    -->
  </div>
</template>

<script setup>

import CategoryReport from '@/components/Reports/CategoryReport.vue';
import ProductReport from '@/components/Reports/ProductReport.vue';
import { ReportSubItem } from '@/enums/ReportSubItem';

const props = defineProps({
  subView: String
});


</script>