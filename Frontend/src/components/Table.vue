<template>
  <DataTable 
    v-model:filters="filters"
    :value="data" 
    :paginator="paginator"
    :rows="rowsPerPage"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    :globalFilterFields="globalFilterFields"
    stripedRows
    showGridlines
    :loading="loading"
    filterDisplay="menu"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <h2 v-if="title" class="text-xl font-bold">{{ title }}</h2>
        
        <IconField  v-if="globalSearch">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText 
            v-model="filters['global'].value" 
            placeholder="Buscar..." 
          />
        </IconField>
        
        <slot name="header-actions"></slot>
      </div>
    </template>

    <Column 
      v-for="col in columns" 
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :sortable="col.sortable !== false"
      :filterField="col.filterField || col.field"
      :showFilterMatchModes="col.showFilterMatchModes !== false"
      :style="col.style"
    >

      <template #body="slotProps" v-if="col.custom">
        <slot :name="`column-${col.field}`" :data="slotProps.data"></slot>
      </template>

      <template #filter="{ filterModel }" v-if="col.filterable">
        <InputText 
          v-model="filterModel.value" 
          type="text" 
          :placeholder="`Buscar por ${col.header.toLowerCase()}`" 
        />
      </template>
    </Column>

    <Column v-if="actions" header="Acciones" :style="{ width: '150px' }">
      <template #body="slotProps">
        <slot name="actions" :data="slotProps.data"></slot>
      </template>
    </Column>

    <template #empty>
      No hay datos disponibles
    </template>
  </DataTable>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  paginator: {
    type: Boolean,
    default: true
  },
  rowsPerPage: {
    type: Number,
    default: 10
  },
  actions: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  globalSearch: {
    type: Boolean,
    default: true
  }
});


const globalFilterFields = computed(() => {
  return props.columns
    .filter(col => col.filterable !== false)
    .map(col => col.field);
});


const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});


watch(() => props.columns, (newColumns) => {
  newColumns.forEach(col => {
    if (col.filterable) {
      filters.value[col.field] = {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
      };
    }
  });
}, { immediate: true });
</script>
