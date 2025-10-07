<template>
    <div class="flex flex-col w-full p-10 gap-10">
        <Toast auto-z-index="true" position="top-center" />
        <h1 class="font-semibold text-2xl text-[#2A2A2A]">Gestión de Categorías</h1>
        
        <Dialog
            v-model:visible="createCategoryDialog.show"
            title="Crear Categoría"
            width="600px"
            :loading="createCategoryDialog.saving"
            @save="createCategoryDialog.save(saveCategory, toast)"
            @cancel="createCategoryDialog.cancel"
        >   
            <template #content>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold">Nombre</label>
                    <InputText v-model="createCategoryDialog.data.name" />
                </div>
            </template>
        </Dialog>

        <Dialog
            v-model:visible="updateCategoryDialog.show"
            title="Actualizar Categoría"
            width="600px"
            :loading="updateCategoryDialog.saving"
            @save="updateCategoryDialog.save(updateCategory, toast)"
            @cancel="updateCategoryDialog.cancel"
        >
            <template #content>
                <div class="flex flex-col gap-2">
                    <label class="font-semibold">Nombre</label>
                    <InputText v-model="updateCategoryDialog.data.name" />
                </div>
            </template>

        </Dialog>

        <Table
            :data="productos"
            :columns="columnas"
            title="Lista de Categorías"
            :actions="true"
        >
            <template #header-actions>
                <div class="flex flex-row gap-2">
                    <Button label="Nueva Categoría" icon="pi pi-plus" @click="createCategoryDialog.open()"/>
                </div>
            </template>

            <template #column-precio="{ data }">
            <span class="font-bold text-green-600">
                ${{ data.precio.toLocaleString() }}
            </span>
            </template>

            <template #column-stock="{ data }">
            <span :class="data.stock < 10 ? 'text-red-600' : 'text-green-600'">
                {{ data.stock }}
            </span>
            </template>

            <template #actions="{ data }">
            <Button 
                icon="pi pi-pencil" 
                class="p-button-rounded p-button-text"
                @click="updateCategoryDialog.open({name: data.name})"
            />
            </template>
        </Table>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import Button from 'primevue/button'
import Table from '../Table.vue'
import Dialog from '../Dialog.vue'
import InputText from 'primevue/inputtext'
import { useDialog } from '@/composables/useDialog';
import { useToast } from 'primevue/usetoast';
import  Toast  from 'primevue/toast';

const productos = ref([
  { id: 1, name: 'Laptop', created_at: '2025-03-1' },
  { id: 2, name: 'Mouse', created_at: '2025-03-1'},
  { id: 3, name: 'Teclado', created_at: '2025-03-1'}
]);

const columnas = [
  { field: 'id', header: 'ID', style: { width: '80px' } },
  { field: 'name', header: 'Nombre' },
  { field: 'created_at', header: 'Fecha Creación'}
];

const createCategoryDialog = useDialog({ name: ''})
const updateCategoryDialog = useDialog({ name: ''})

const toast = useToast() 

const saveCategory = async (data) => {
  console.log('Guardando:', data);
  // await api.post('/categorias', data)
};

const updateCategory = (data) => {
  console.log('Editar:', data);
  // api put
};

</script>