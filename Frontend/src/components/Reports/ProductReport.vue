<template>
  <div class="flex items-center justify-center px-10 pb-10 w-full h-full">
    <GraficoBarra 
      title="Ganancias por Producto"
      :labels="labels"
      :data="data"
      data-label="Ganancias ($)"
      bar-color="#679DFF"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import GraficoBarra from "../GraficoBarra.vue";
import { getProfitByProduct } from "@/services/api/apiProductsStock"
import { useToast } from "primevue/usetoast";

const labels = ref([]);
const data = ref([]);
const toast = useToast();

const fetchProfitByProduct = async () => {
  try {
    const res = await getProfitByProduct();
    labels.value = res.map((item) => item.product);
    data.value = res.map((item) => item.ganancia);
  } catch (error) {
    console.error("Error al obtener ganancias por categoría:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudieron cargar las ganancias por categoría",
      life: 3000,
    });
  }
};

onMounted(fetchProfitByProduct);
</script>
