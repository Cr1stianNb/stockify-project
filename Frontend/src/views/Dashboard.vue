<template>
    <div class="flex flex-col w-full h-dvh overflow-y-auto">


        <div v-if="loading" class="flex items-center justify-center h-screen">
            <i class="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
        </div>


        <div v-else-if="error" class="flex items-center justify-center h-screen">
            <Card class="w-96 border border-red-200">
                <template #content>
                    <div class="flex flex-col items-center gap-3 text-center">
                        <i class="pi pi-exclamation-triangle text-4xl text-red-500"></i>
                        <p class="text-red-600 font-semibold">{{ error }}</p>
                        <Button label="Reintentar" @click="fetchData" severity="danger" />
                    </div>
                </template>
            </Card>
        </div>

        <template v-else>
            <div class="flex flex-row items-center bg-[#F6FAFF] py-4 sales">
                <div class="flex flex-col p-10 gap-5">
                    <h1 class="font-semibold text-2xl text-[#2A2A2A]">Actividad de Ventas</h1>
                    <div class="flex gap-5">
                        <Card class="w-[12rem] !shadow-md border border-gray-200">
                            <template #title>
                                <div class="flex flex-row items-center justify-center gap-2 text-[#dc6d48]">
                                    <p class="text-2xl">{{ dashboardData.totalEntries }}</p>
                                    <i class="pi pi-arrow-circle-up"></i>
                                </div>
                            </template>
                            <template #footer>
                                <h1 class="text-center">Total Entradas</h1>
                            </template>
                        </Card>
                        <Card class="w-[12rem] !shadow-md border border-gray-200">
                            <template #title>
                                <div class="flex flex-row items-center justify-center gap-2 text-[#0078DE]">
                                    <p class="text-2xl">{{ dashboardData.totalExits }}</p>
                                    <i class="pi pi-arrow-circle-up"></i>
                                </div>
                            </template>
                            <template #footer>
                                <h1 class="text-center">Total Salidas</h1>
                            </template>
                        </Card>
                        <Card class="w-[12rem] !shadow-md border border-gray-200">
                            <template #title>
                                <div class="flex flex-row items-center justify-center gap-2 text-[#0eb874]">
                                    <p class="text-2xl">${{ formatNumber(dashboardData.profit) }}</p>
                                    <i class="pi pi-arrow-circle-up"></i>
                                </div>
                            </template>
                            <template #footer>
                                <h1 class="text-center">Beneficios</h1>
                            </template>
                        </Card>  
                        <Card class="w-[12rem] !shadow-md border border-gray-200">
                            <template #title>
                                <div class="flex flex-row items-center justify-center gap-2 text-[#0eb874]">
                                    <p class="text-2xl">{{ dashboardData.profitPercentage }}</p>
                                    <i class="pi pi-percentage"></i>
                                </div>
                            </template>
                            <template #footer>
                                <h1 class="text-center">Porcentaje Beneficios</h1>
                            </template>
                        </Card>
                    </div>
                </div>
                <Divider layout="vertical" />
                <div class="flex flex-col gap-3 items-center justify-center w-full">
                    <div class="w-3/4 flex justify-start pl-4">
                        <h1 class="font-semibold text-2xl text-[#2A2A2A]">Resumen de Inventario</h1>
                    </div>

                    <div class="w-full flex flex-col gap-2 items-center justify-center">
                        <Card class="w-3/4 border border-gray-200 !shadow-none">
                            <template #content>
                                <div class="flex flex-row justify-between">
                                    <p class="font-semibold">Cantidad en Stock</p>
                                    <Divider layout="vertical" />
                                    <p class="font-bold">{{ formatNumber(dashboardData.totalStock) }}</p>
                                </div>
                            </template>
                        </Card>

                        <Card class="w-3/4 border border-gray-200 !shadow-none">
                            <template #content>
                                <div class="flex flex-row justify-between">
                                    <p class="font-semibold">Valor en Stock</p>
                                    <Divider layout="vertical" />
                                    <p class="font-bold">$ {{ formatNumber(dashboardData.stockValue) }}</p>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </div>
            
            <div class="flex p-10 gap-7">
                <Card class="w-1/2 border border-gray-200 !shadow-md">
                    <template #title>
                        <h2 class="text-xl font-semibold text-[#2A2A2A]">Detalles Producto</h2>
                        <Divider />
                    </template>
                    <template #content>
                        <div class="flex flex-row gap-10">
                            <!-- Left Column - Statistics -->
                            <div class="flex flex-col gap-4 flex-1">
                                <div class="flex justify-between items-center py-1">
                                    <span class="text-red-500 font-medium">Productos con bajo stock</span>
                                    <span class="text-red-500 font-bold">{{ dashboardData.lowStockCount }}</span>
                                </div>
                                
                                <div class="flex justify-between items-center py-1">
                                    <span class="text-[#2A2A2A] font-medium">Total Categorías</span>
                                    <span class="text-[#2A2A2A] font-bold">{{ dashboardData.totalCategories }}</span>
                                </div>
                                
                                <div class="flex justify-between items-center py-3">
                                    <span class="text-[#2A2A2A] font-medium">Total productos</span>
                                    <span class="text-[#2A2A2A] font-bold">{{ dashboardData.totalProducts }}</span>
                                </div>
                                
                                <div class="flex justify-between items-center py-1">
                                    <span class="text-red-500 font-medium">Productos sin Movimiento</span>
                                    <span class="text-red-500 font-bold">{{ dashboardData.noMovementCount }}</span>
                                </div>
                            </div>
                            
                            <Divider layout="vertical" />
                            
                            <div class="flex flex-col justify-center items-center">
                                <h1 class="font-semibold">Productos por Categoría</h1> 
                                <GraficoCircular/>
                            </div>
                        </div>
                    </template>
                </Card>
                
                <Card class="w-1/2 border border-gray-200 !shadow-md">
                    <template #title>
                        <h2 class="text-xl font-semibold text-[#2A2A2A]">Top Productos más vendidos</h2>
                        <Divider />
                    </template>
                    <template #content>
                        <div class="flex items-center justify-center h-full">
                            <template v-if="dashboardData.topProducts && dashboardData.topProducts.length">
                                <div class="grid grid-cols-3 gap-6">
                                    <div 
                                        v-for="(product, index) in dashboardData.topProducts" 
                                        :key="product.id"
                                        class="flex flex-col items-center"
                                        :class="{ 'border-0 border-r-2 border-r-gray-200 pr-6': index < 2 }"
                                    >
                                        <div 
                                            class="w-32 h-32 rounded-lg mb-3 flex items-center justify-center"
                                            :class="getProductColor(index)"
                                        >
                                            <i class="pi pi-image text-white text-2xl"></i>
                                        </div>
                                        <p class="text-sm text-gray-600 text-center mb-2">{{ product.name }}</p>
                                        <p class="text-3xl font-bold text-[#2A2A2A]">
                                            {{ product.total_sold }} 
                                            <span class="text-base font-normal text-gray-500">und.</span>
                                        </p>
                                    </div>
                                </div>
                            </template>

                            <template v-else>
                                <p class="text-gray-500 text-lg">No hay productos destacados</p>
                            </template>
                        </div>

                    </template> 
                </Card>
            </div>
            
            <div class="flex px-10 pb-10">
                <GraficoLinea :earnings-data="dashboardData.earningsByDay" />
            </div>
            
            <div class="flex flex-row gap-10 px-10 pb-10">
                <ProductReport />
                <CategoryReport />
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import 'primeicons/primeicons.css';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import GraficoLinea from '@/components/GraficoLinea.vue';
import GraficoCircular from '@/components/GraficoCircular.vue';
import ProductReport from '@/components/Reports/ProductReport.vue';
import CategoryReport from '@/components/Reports/CategoryReport.vue';


import {
    getTotalEntries,
    getTotalExits,
    getProfit,
    getProfitPercentage,
    getProductStocks,
    getStockValue,
    getLowStockProducts,
    getCategorySummary,
    getProductsWithoutMovement,
    getTopSoldProducts,
    getEarningsByDay
} from '@/services/api/apiProductsStock';

const loading = ref(true);
const error = ref(null);

const dashboardData = ref({
    totalEntries: 0,
    totalExits: 0,
    profit: 0,
    profitPercentage: 0,
    totalStock: 0,
    stockValue: 0,
    lowStockCount: 0,
    totalCategories: 0,
    totalProducts: 0,
    noMovementCount: 0,
    topProducts: [],
    earningsByDay: []
});

// Función para formatear números
const formatNumber = (value) => {
    if (!value && value !== 0) return '0';
    return new Intl.NumberFormat('es-CL').format(value);
};

// Función para obtener colores de productos
const getProductColor = (index) => {
    const colors = [
        'bg-orange-500',
        'bg-gradient-to-br from-purple-400 to-blue-400',
        'bg-gradient-to-br from-green-400 to-teal-400'
    ];
    return colors[index] || 'bg-gray-500';
};

// Función principal para cargar todos los datos
const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
        // Hacer todas las llamadas en paralelo
        const [
            entriesRes,
            exitsRes,
            profitRes,
            profitPercentageRes,
            stockRes,
            stockValueRes,
            lowStockRes,
            categoriesRes,
            noMovementRes,
            topProductsRes,
            earningsRes
        ] = await Promise.all([
            getTotalEntries(),
            getTotalExits(),
            getProfit(),
            getProfitPercentage(),
            getProductStocks(),
            getStockValue(),
            getLowStockProducts(),
            getCategorySummary(),
            getProductsWithoutMovement(),
            getTopSoldProducts('todo'),
            getEarningsByDay()
        ]);

        // Asignar los datos
        dashboardData.value = {
            totalEntries: entriesRes.data.total_entries || 0,
            totalExits: exitsRes.data.total_exits || 0,
            profit: profitRes.data.profit || 0,
            profitPercentage: profitPercentageRes.data.profit_percentage?.toFixed(2) || 0,
            totalStock: stockRes.data.total_stock || 0,
            stockValue: stockValueRes.data.total_value || 0,
            lowStockCount: lowStockRes.data.count || 0,
            totalCategories: categoriesRes.data.total_categories || 0,
            totalProducts: stockRes.data.total_products || 0,
            noMovementCount: noMovementRes.data.count || 0,
            topProducts: topProductsRes.data.slice(0, 3) || [],
            earningsByDay: earningsRes.data || []
        };

    } catch (err) {
        console.error('Error fetching dashboard data:', err);
        error.value = 'Error al cargar los datos del dashboard. Por favor, intenta nuevamente.';
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.sales {
    box-shadow: 0 5px 5px -3px rgba(0,0,0,0.1), 0 0px 7px -1px rgba(0,0,0,0.05);
}

:deep(.p-card-body) {
  padding: 0.75rem !important;
}
</style>