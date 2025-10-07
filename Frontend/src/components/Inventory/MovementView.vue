<template>
    <div class="flex flex-col w-full p-10 gap-10">
        <Toast auto-z-index="true" position="top-center" />
        <h1 class="font-semibold text-2xl text-[#2A2A2A]">Gestión de Movimientos</h1>
        
        <Dialog
            v-model:visible="createMovementDialog.show"
            title="Crear Movimiento"
            width="600px"
            :loading="createMovementDialog.saving"
            @save="createMovementDialog.save(saveMovement, toast)"
            @cancel="createMovementDialog.cancel"
        >   
            <template #content>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Tipo</label>
                        <Select 
                            v-model="createMovementDialog.data.type" 
                            :options="['ENTRADA', 'SALIDA']"
                            placeholder="Selecciona un tipo"
                        />
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Cantidad</label>
                        <InputNumber v-model="createMovementDialog.data.quantity" />
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Producto</label>
                        <Select 
                            v-model="createMovementDialog.data.product"
                            filter="true" 
                            empty-filter-message="Producto no encontrado"
                            :options="['Teclado', 'Mouse', 'Teléfono']"
                            placeholder="Selecciona un Producto"
                        />
                    </div>
                </div>
            </template>
        </Dialog>

        <Dialog
            v-model:visible="updateMovementDialog.show"
            title="Actualizar Movimiento"
            width="600px"
            :loading="updateMovementDialog.saving"
            @save="updateMovementDialog.save(updateMovement, toast)"
            @cancel="updateMovementDialog.cancel"
        >
            <template #content>
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">ID</label>
                        <InputText v-model="updateMovementDialog.data.id_movement" disabled class="bg-gray-100" />
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Tipo</label>
                        <Select 
                            v-model="updateMovementDialog.data.type" 
                            :options="['ENTRADA', 'SALIDA']"
                            placeholder="Selecciona un tipo"
                        />
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Cantidad</label>
                        <InputNumber v-model="updateMovementDialog.data.quantity" />
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label class="font-semibold">Producto</label>
                        <InputText v-model="updateMovementDialog.data.product" />
                    </div>
                </div>
            </template>
        </Dialog>

        <Table
            :data="movimientos"
            :columns="columnas"
            title="Lista de Movimientos"
            :actions="false"
        >
            <template #header-actions>
                <Button 
                    label="Nuevo Movimiento" 
                    icon="pi pi-plus" 
                    @click="createMovementDialog.open()"
                />
            </template>

            <template #column-type="{ data }">
                <Tag 
                    :value="data.type" 
                    :severity="data.type === 'ENTRADA' ? 'success' : 'danger'" 
                />
            </template>
        </Table>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Table from '../Table.vue';
import Dialog from '../Dialog.vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import Tag from 'primevue/tag';
import { useDialog } from '@/composables/useDialog';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
const movimientos = ref([
  { id_movement: 1, type: 'ENTRADA', quantity: 50, product: 'Laptop', created_at: '2025-03-01' },
  { id_movement: 2, type: 'SALIDA', quantity: 10, product: 'Mouse', created_at: '2025-03-02' },
  { id_movement: 3, type: 'ENTRADA', quantity: 100, product: 'Teclado', created_at: '2025-03-03' }
]);

const columnas = [
  { field: 'id_movement', header: 'ID', style: { width: '80px' } },
  { field: 'type', header: 'Tipo', custom: true },
  { field: 'quantity', header: 'Cantidad' },
  { field: 'product', header: 'Producto' },
  { field: 'created_at', header: 'Fecha' }
];

const createMovementDialog = useDialog({ 
    type: 'ENTRADA',
    quantity: 0,
    product: ''
});

const updateMovementDialog = useDialog({ 
    id_movement: 0,
    type: 'ENTRADA',
    quantity: 0,
    product: ''
});

const toast = useToast();

const saveMovement = async (data) => {
  console.log('Guardando movimiento:', data);
  // await api.post('/movimientos', data)
};

const updateMovement = async (data) => {
  console.log('Actualizando movimiento:', data);
  // await api.put('/movimientos', data)
};
</script>