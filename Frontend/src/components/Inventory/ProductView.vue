<template>
  <div class="flex flex-col w-full p-10 gap-10">
    <Toast auto-z-index="true" position="top-center" />
    <h1 class="font-semibold text-2xl text-[#2A2A2A]">Gestión de Productos</h1>
    
    <!-- Dialog Crear Producto -->
    <Dialog
      v-model:visible="createProductDialog.show"
      title="Crear Producto"
      width="600px"
      :loading="createProductDialog.saving"
      @save="createProductDialog.save(saveProduct, toast)"
      @cancel="createProductDialog.cancel"
    >   
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Nombre</label>
            <InputText v-model="createProductDialog.data.name" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Descripción</label>
            <Textarea 
              v-model="createProductDialog.data.description" 
              rows="4"
              placeholder="Escribe una descripción..."
            />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Stock</label>
            <InputNumber v-model="createProductDialog.data.stock" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Precio Unitario</label>
            <InputNumber 
              v-model="createProductDialog.data.unit_price" 
              mode="currency" 
              currency="USD"
            />
          </div>
        </div>
      </template>
    </Dialog>

    <!-- Dialog Editar Producto -->
    <Dialog
      v-model:visible="updateProductDialog.show"
      title="Editar Producto"
      width="600px"
      :loading="updateProductDialog.saving"
      @save="updateProductDialog.save(updateProduct, toast)"
      @cancel="updateProductDialog.cancel"
    >
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label class="font-semibold">ID</label>
            <InputText v-model="updateProductDialog.data.id_product" disabled class="bg-gray-100" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Nombre</label>
            <InputText v-model="updateProductDialog.data.name" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Descripción</label>
            <Textarea 
              v-model="updateProductDialog.data.description" 
              rows="4"
            />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Stock</label>
            <InputNumber v-model="updateProductDialog.data.stock" />
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-semibold">Precio Unitario</label>
            <InputNumber 
              v-model="updateProductDialog.data.unit_price" 
              mode="currency" 
              currency="USD"
            />
          </div>
        </div>
      </template>
    </Dialog>

    <Table
      :data="products"
      :columns="columnas"
      title="Lista de Productos"
      :actions="true"
      :loading="loading"
    >
      <template #header-actions>
        <Button 
          label="Nuevo Producto" 
          icon="pi pi-plus" 
          @click="createProductDialog.open()"
        />
      </template>

      <template #column-unit_price="{ data }">
        <span class="font-bold text-green-600">
          ${{ data.unit_price.toLocaleString() }}
        </span>
      </template>

      <template #column-stock="{ data }">
        <span :class="data.stock < 10 ? 'text-red-600' : 'text-green-600'">
          {{ data.stock }}
        </span>
      </template>

      <template #column-id_category="{ data }">
        <span>{{ data.id_category ?? '-' }}</span>
      </template>

      <template #actions="{ data }">
        <Button 
          icon="pi pi-pencil" 
          severity="info"
          text
          rounded
          @click="updateProductDialog.open(data)"
        />
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getProducts, createProduct, deleteProduct as deleteProductAPI } from '@/services/productService';
import { useDialog } from '@/composables/useDialog';
import { useToast } from 'primevue/usetoast';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import Table from '../Table.vue';
import Dialog from '../Dialog.vue';


interface Product {
  id_product?: number;
  name: string;
  description: string;
  stock: number;
  unit_price: number;
  created_at?: string;
  id_category?: number | null;
}

const products = ref<Product[]>([]);
const loading = ref(false);
const showDeleteConfirm = ref(false);
const productToDelete = ref<Product | null>(null);

const toast = useToast();

const columnas = [
  { field: 'id_product', header: 'ID', style: { width: '80px' } },
  { field: 'name', header: 'Nombre', filterable: true },
  { field: 'description', header: 'Descripción', filterable: true },
  { field: 'stock', header: 'Stock', custom: true, filterable: true },
  { field: 'unit_price', header: 'Precio', custom: true, filterable: true },
  { field: 'created_at', header: 'Fecha', filterable: true },
  { field: 'id_category', header: 'Categoría', custom: true }
];

const createProductDialog = useDialog({
  name: '',
  description: '',
  stock: 0,
  unit_price: 0
});

const updateProductDialog = useDialog({
  id_product: 0,
  name: '',
  description: '',
  stock: 0,
  unit_price: 0
});


const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await getProducts();
    products.value = res.data;
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error cargando productos',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};

const saveProduct = async (data: Product) => {
  const payload = {
    name: data.name,
    description: data.description,
    stock: data.stock,
    unit_price: data.unit_price
  };
  
  await createProduct(payload);
  await fetchProducts();
};

const updateProduct = async (data: Product) => {
  // await updateProductAPI(data.id_product!, data);
  console.log('Actualizando:', data);
  await fetchProducts();
};

const confirmDelete = (product: Product) => {
  productToDelete.value = product;
  showDeleteConfirm.value = true;
};

const deleteProduct = async () => {
  if (!productToDelete.value?.id_product) return;
  
  try {
    await deleteProductAPI(productToDelete.value.id_product);
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Producto eliminado correctamente',
      life: 3000
    });
    await fetchProducts();
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error al eliminar el producto',
      life: 3000
    });
  }
};

onMounted(fetchProducts);
</script>