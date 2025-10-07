<template>
    <div class="flex w-full">
        <Card class="w-full border border-gray-200 !shadow-md">
            <template #title>
                <h2 class="text-xl font-semibold text-[#2A2A2A]">Beneficios por Día</h2>
                <Divider />
            </template>
            <template #content>
                <Chart type="line" :data="chartData" :options="chartOptions" class="h-96" />
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Chart from 'primevue/chart';

const data = [-500, 1200, -300, 1800, 2200, -800, 1500]

const chartData = ref({
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
        {
            label: 'Beneficios ($)',
            data: data,
            fill: false,
            borderColor: '#0eb874',
            tension: 0,
            pointBackgroundColor: data.map(v => (v < 0 ? '#E32722' : '#0eb874')),
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            segment: {
                borderColor: (ctx) => {
                    return ctx.p1.parsed.y < 0 ? '#E32722' : '#0eb874'
                }
            }
        }
    ]
});

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
                    return 'Beneficios: $' + context.parsed.y.toLocaleString();
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
    },
    interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
    }
});
</script>

<style scoped>
:deep(.p-card-body) {
  padding: 1.5rem !important;
}
</style>