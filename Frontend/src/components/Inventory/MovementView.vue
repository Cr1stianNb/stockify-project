<template>
    <div class="flex flex-col w-full p-10 gap-10">
        <Toast auto-z-index="true" position="top-center" />
        <h1 class="font-semibold text-2xl text-[#2A2A2A]">Gestión de Movimientos</h1>
        
        <Dialog
            v-model:visible="createMovementDialog.show"
            title="Crear Movimiento"
            width="600px"
            :loading="createMovementDialog.saving"
            @save="createMovementDialog.save(saveMovement)"
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
                            v-model="createMovementDialog.data.id_product"
                            :options="products"
                            optionLabel="name"
                            optionValue="id_product"
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
            @save="updateMovementDialog.save(updateMovement)"
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
                    :severity="data.type === 'VENTA' ? 'success' : 'danger'" 
                />
            </template>
        </Table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
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
import { getProduct, getProducts } from '@/services/productService';
import { createMovementCompra, createMovementVenta, getMovements } from '@/services/movementService';


const movimientos = ref([]);

const columnas = [
  { field: 'id_movement', header: 'ID' },
  { field: 'id_product', header: 'Producto' },
  { field: 'unit_price', header: 'Precio Unitario' },
  { field: 'amount', header: 'Cantidad' },
  { field: 'type', header: 'Tipo', custom: true },
  { field: 'date', header: 'Fecha' }
];


const createMovementDialog = useDialog({ 
    id_user: 1,
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
const products = ref([])

const fetchData = async () => {
    try {
        const res = await getProducts();
        products.value = res.data
        console.log("PODUCTOS: ", products.value)
    } catch(e) {
        console.log(e)
    }
}

const fetchMovements = async () => {
    try {
        const res = await getMovements();
        // Transformamos la estructura anidada
        movimientos.value = res.data.flatMap(item => 
            item.id_movement.map(mov => ({
                id_movement: mov.id_movement,
                id_product: mov.id_product,
                unit_price: parseFloat(mov.unit_price),
                amount: mov.amount,
                type: item.type.toUpperCase(), // para mantener coherencia con ENTRADA/SALIDA
                date: item.date
            }))
        );
        console.log("MOVIMIENTOS:", movimientos.value);
    } catch (error) {
        console.error("Error al obtener movimientos:", error);
        toast.add({ severity: 'error', summary: 'Error al cargar movimientos', life: 3000 });
    }
};


const saveMovement = async (data) => {
    try {
        const productData = (await getProduct(data.id_product)).data;
        const unit_price = productData.unit_price;
        const stock = productData.stock;

        if (data.type === 'ENTRADA') {
            if (data.quantity > 5000) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'No se puede realizar la compra: cantidad máxima permitida es 5000.', life: 3000 });
                return;
            }
            await createMovementCompra({
                id_user: data.id_user,
                id_product: data.id_product,
                unit_price: unit_price,
                amount: data.quantity
            });
        } else if (data.type === 'SALIDA') {
            if (data.quantity > stock) {
                toast.add({ severity: 'error', summary: 'Error', detail: 'No hay más ejemplares disponibles para vender.', life: 3000 });
                return;
            }
            await createMovementVenta({
                id_user: data.id_user,
                id_product: data.id_product,
                unit_price: unit_price,
                amount: data.quantity
            });
        }
        toast.add({ severity: 'success', summary: 'Movimiento creado', life: 3000 });
        await fetchMovements();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error al crear movimiento', detail: error.message, life: 3000 });
    }
};

onMounted(() => {
    fetchData()
    fetchMovements()
})

</script>