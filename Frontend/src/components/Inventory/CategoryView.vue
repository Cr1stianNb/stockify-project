<template>
    <div class="flex flex-col w-full p-10 gap-10">
        <Toast auto-z-index="true" position="top-center" />
        <h1 class="font-semibold text-2xl text-[#2A2A2A]">Gestión de Categorías</h1>
        
        <Dialog
            v-model:visible="createCategoryDialog.show"
            title="Crear Categoría"
            width="600px"
            :loading="createCategoryDialog.saving"
            @save="createCategoryDialog.save(saveCategory)"
            @cancel="createCategoryDialog.cancel"
        >   
            <template #content>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Nombre</label>
                        <InputText v-model="createCategoryDialog.data.name" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Descripción</label>
                        <Textarea 
                        v-model="createCategoryDialog.data.description" 
                        rows="4"
                        placeholder="Escribe una descripción..."
                        />
                    </div>
                </div>
            </template>

            
        </Dialog>

        <Dialog
            v-model:visible="updateCategoryDialog.show"
            title="Actualizar Categoría"
            width="600px"
            :loading="updateCategoryDialog.saving"
            @save="updateCategoryDialog.save(editCategory)"
            @cancel="updateCategoryDialog.cancel"
        >
            <template #content>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Nombre</label>
                        <InputText v-model="updateCategoryDialog.data.name" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Descripción</label>
                        <Textarea 
                        v-model="updateCategoryDialog.data.description" 
                        rows="4"
                        placeholder="Escribe una descripción..."
                        />
                    </div>
                </div>
            </template>

        </Dialog>

        <Table
            :data="categorias"
            :columns="columnas"
            title="Lista de Categorías"
            :actions="true"
        >
            <template #header-actions>
                <div class="flex flex-row gap-2">
                    <Button label="Nueva Categoría" icon="pi pi-plus" @click="createCategoryDialog.open()"/>
                </div>
            </template>

            <template #actions="{ data }">
            <Button 
                icon="pi pi-pencil" 
                class="p-button-rounded p-button-text"
                @click="updateCategoryDialog.open({ id_category: data.id_category, name: data.name, description: data.description})"
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
import { Textarea } from 'primevue';
import { useDialog } from '@/composables/useDialog';
import { useToast } from 'primevue/usetoast';
import  Toast  from 'primevue/toast';
import { getCategories, getCategory, createCategory, updateCategory } from '@/services/categoryService';
import { onMounted } from 'vue';
const categorias = ref([]);
const loading = ref(false);

const fetchCategories = async () => {
  loading.value = true;
  try {
    const res = await getCategories();
    categorias.value = res.data || [];
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las categorías', life: 3000 });
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCategories);


const columnas = [
  { field: 'id_category', header: 'ID', style: { width: '80px' } },
  { field: 'name', header: 'Nombre' },
  { field: 'created_at', header: 'Fecha Creación'},
  { field: 'description', header: 'Descripción'}
];

const createCategoryDialog = useDialog({ name: '', description: ''})
const updateCategoryDialog = useDialog({ id_category: -1, name: '', description: ''})

const toast = useToast() 

const saveCategory = async (data) => {
    console.log(data)
  try {
    await createCategory(data);
    toast.add({ severity: 'success', summary: 'Categoría creada', detail: 'Se ha agregado correctamente.', life: 3000 });
    await fetchCategories();
  } catch (err) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la categoría.', life: 3000 });
  }
};


const editCategory = async (data) => {
    console.log(data)
    try {
        await updateCategory(data.id_category, data);
        toast.add({ severity: 'success', summary: 'Categoría actualizada', detail: 'Cambios guardados correctamente.', life: 3000 });
        await fetchCategories();
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la categoría.', life: 3000 });
    }
};


</script>