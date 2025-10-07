<template>
    <div class="flex w-full">
        <Card class="w-full border border-gray-200 !shadow-md">
            <template #title>
                <h2 class="text-xl font-semibold text-[#2A2A2A]">{{ title }}</h2>
                <Divider />
            </template>
            <template #content>
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-96" />
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Chart from 'primevue/chart';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    labels: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    dataLabel: {
        type: String,
        default: 'Ganancias ($)'
    },
    barColor: {
        type: String,
        default: '#0eb874'
    }
});

const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            label: props.dataLabel,
            data: props.data,
            backgroundColor: props.barColor,
            borderColor: props.barColor,
            borderWidth: 1,
            borderRadius: 6
        }
    ]
}));

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                color: '#2A2A2A',
                font: {
                    size: 14,
                    weight: '600'
                }
            }
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
                label: function(context) {
                    return props.dataLabel + ': $' + context.parsed.y.toLocaleString();
                }
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#2A2A2A',
                font: {
                    size: 12
                }
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false
            },
            ticks: {
                color: '#2A2A2A',
                font: {
                    size: 12
                },
                callback: function(value) {
                    return '$' + value.toLocaleString();
                }
            }
        }
    }
});
</script>

<style scoped>
:deep(.p-card-body) {
  padding: 1.5rem !important;
}
</style>