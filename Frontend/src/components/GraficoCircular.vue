<template>
    <div class="flex grow">
        <div v-if="loading" class="flex items-center justify-center w-full">
            <span>Cargando datos...</span>
        </div>
        <Chart v-else type="doughnut" :data="chartData" :options="chartOptions" class="w-50"/>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import { getAmountProductsByCategory } from "@/services/api/apiProductsStock";

const chartData = ref();
const chartOptions = ref(null);
const loading = ref(true);

onMounted(async () => {
    await fetchData();
    chartOptions.value = setChartOptions();
});

const fetchData = async() => {
    try {
        loading.value = true;
        const data = await getAmountProductsByCategory();
        console.log('Datos recibidos:', data);
        
        chartData.value = setChartData(data);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        chartData.value = setChartData([]);
    } finally {
        loading.value = false;
    }
}

const setChartData = (categoryData) => {
    const documentStyle = getComputedStyle(document.body);
    
    if (!categoryData || categoryData.length === 0) {
        return {
            labels: ['Sin datos'],
            datasets: [{
                data: [1],
                backgroundColor: [documentStyle.getPropertyValue('--p-gray-300')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-gray-200')]
            }]
        };
    }
    
    const labels = categoryData.map(item => item.category);
    const data = categoryData.map(item => item.products);
    
    const colors = generateColors(categoryData.length, documentStyle);
    
    return {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: colors.background,
                hoverBackgroundColor: colors.hover
            }
        ]
    };
};

const generateColors = (count, documentStyle) => {
    const baseColors = [
        '--p-cyan-500',
        '--p-orange-500',
        '--p-gray-500',
        '--p-green-500',
        '--p-purple-500',
        '--p-pink-500',
        '--p-indigo-500',
        '--p-teal-500',
        '--p-amber-500',
        '--p-red-500',
        '--p-blue-500',
        '--p-yellow-500'
    ];
    
    const hoverColors = [
        '--p-cyan-400',
        '--p-orange-400',
        '--p-gray-400',
        '--p-green-400',
        '--p-purple-400',
        '--p-pink-400',
        '--p-indigo-400',
        '--p-teal-400',
        '--p-amber-400',
        '--p-red-400',
        '--p-blue-400',
        '--p-yellow-400'
    ];
    
    const background = [];
    const hover = [];
    
    for (let i = 0; i < count; i++) {
        const colorIndex = i % baseColors.length;
        background.push(documentStyle.getPropertyValue(baseColors[colorIndex]));
        hover.push(documentStyle.getPropertyValue(hoverColors[colorIndex]));
    }
    
    return { background, hover };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    font: {
                        size: 12
                    }
                },
                position: 'right'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} productos (${percentage}%)`;
                    }
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true
    };
};

</script>
