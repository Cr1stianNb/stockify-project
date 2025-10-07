<template>
  <div class="flex w-full">
    <Card class="w-full border border-gray-200 !shadow-md">
      <template #title>
        <h2 class="text-xl font-semibold text-[#2A2A2A]">Beneficios por Día</h2>
        <Divider />
      </template>

      <template #content>
        <Chart
          type="line"
          :data="chartData"
          :options="chartOptions"
          class="h-96"
        />
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Card from "primevue/card";
import Divider from "primevue/divider";
import Chart from "primevue/chart";
import { getEarningsByDay } from "@/services/api/apiProductsStock";
// ↑ ajusta el import según tu servicio real (puede ser dashboardService o salesService)

const chartData = ref({});
const chartOptions = ref({});

// genera los datos del gráfico dinámicamente
const setChartData = (data) => {
  const labels = data.map((item) => item.fecha);
  const values = data.map((item) => item.ganancia);

  return {
    labels,
    datasets: [
      {
        label: "Beneficios ($)",
        data: values,
        fill: false,
        borderColor: "#0eb874",
        tension: 0.2,
        pointBackgroundColor: values.map((v) =>
          v < 0 ? "#E32722" : "#0eb874"
        ),
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        segment: {
          borderColor: (ctx) =>
            ctx.p1.parsed.y < 0 ? "#E32722" : "#0eb874",
        },
      },
    ],
  };
};

const setChartOptions = () => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#2A2A2A",
        font: { size: 14, weight: "600" },
      },
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleColor: "#fff",
      bodyColor: "#fff",
      callbacks: {
        label: (context) =>
          "Beneficios: $" + context.parsed.y.toLocaleString(),
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#2A2A2A",
        font: { size: 12 },
      },
    },
    y: {
      beginAtZero: true,
      grid: { color: "rgba(0, 0, 0, 0.05)", drawBorder: false },
      ticks: {
        color: "#2A2A2A",
        font: { size: 12 },
        callback: (value) => "$" + value.toLocaleString(),
      },
    },
  },
  interaction: { mode: "nearest", axis: "x", intersect: false },
});

// carga los datos del gráfico
const fetchData = async () => {
  try {
    const res = await getEarningsByDay(); // ← tu API que devuelve [{fecha, ganancia}]
    const data = res.data || [];
    chartData.value = setChartData(data);
    chartOptions.value = setChartOptions();
  } catch (err) {
    console.error("Error al cargar los datos del gráfico:", err);
  }
};

onMounted(fetchData);
</script>

<style scoped>
:deep(.p-card-body) {
  padding: 1.5rem !important;
}
</style>
