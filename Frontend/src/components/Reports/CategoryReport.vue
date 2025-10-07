<template>
  <div class="flex items-center justify-center px-10 pb-10 w-full h-full">
    <GraficoBarra 
      title="Ganancias por Categoría"
      :labels="labels"
      :data="data"
      data-label="Ganancias ($)"
      bar-color="#00B26B"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import GraficoBarra from "../GraficoBarra.vue";
import { getProfitByCategory } from "@/services/api/apiProductsStock"
import { useToast } from "primevue/usetoast";

const labels = ref([]);
const data = ref([]);
const toast = useToast();

const fetchProfitByCategory = async () => {
  try {
    const res = await getProfitByCategory();
    labels.value = res.map((item) => item.category);
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

onMounted(fetchProfitByCategory);
</script>
