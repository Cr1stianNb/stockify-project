<template>
    <div class="flex flex-col w-full h-dvh overflow-y-auto">
        <div class="flex flex-row items-center bg-[#F6FAFF] py-4 sales">
            <div class="flex flex-col p-10 gap-5">
                <h1 class="font-semibold text-2xl text-[#2A2A2A]">Actividad de Ventas</h1>
                <div class="flex gap-5">
                    <Card class="w-[12rem] !shadow-md border border-gray-200">
                        <template #title>
                            <div class="flex flex-row items-center justify-center gap-2 text-[#dc6d48]">
                                <p class="text-2xl">123</p>
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
                                <p class="text-2xl">53</p>
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
                                <p class="text-2xl">123</p>
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
                                <p class="text-2xl">1.23</p>
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
                        <p class="font-bold">12123</p>
                        </div>
                    </template>
                    </Card>

                    <Card class="w-3/4 border border-gray-200 !shadow-none">
                        <template #content>
                            <div class="flex flex-row justify-between">
                            <p class="font-semibold">Valor en Stock</p>
                            <Divider layout="vertical" />
                            <p class="font-bold">$ 12.12123</p>
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
                                <span class="text-red-500 font-bold">3</span>
                            </div>
                            
                            <div class="flex justify-between items-center py-1">
                                <span class="text-[#2A2A2A] font-medium">Total Categorías</span>
                                <span class="text-[#2A2A2A] font-bold">39</span>
                            </div>
                            
                            <div class="flex justify-between items-center py-3">
                                <span class="text-[#2A2A2A] font-medium">Total productos</span>
                                <span class="text-[#2A2A2A] font-bold">190</span>
                            </div>
                            
                            <div class="flex justify-between items-center py-1">
                                <span class="text-red-500 font-medium">Productos sin Movimiento</span>
                                <span class="text-red-500 font-bold">121</span>
                            </div>
                        </div>
                        
                        <Divider layout="vertical" />
                        
                        <div class="flex justify-center items-center">
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
                        <!-- acá debería de ser con la backend-->
                        <!-- placeholder -->
                        <div class="grid grid-cols-3 gap-6">
                            <!-- Item 1 -->
                            <div class="flex flex-col items-center border-0 border-r-2 border-r-gray-200 pr-6">
                                <div class="w-32 h-32 bg-orange-500 rounded-lg mb-3 flex items-center justify-center">
                                    <i class="pi pi-image text-white text-2xl"></i>
                                </div>
                                <p class="text-sm text-gray-600 text-center mb-2">Mochila</p>
                                <p class="text-3xl font-bold text-[#2A2A2A]">171 <span class="text-base font-normal text-gray-500">und.</span></p>
                            </div>

                            <!-- Item 2 -->
                            <div class="flex flex-col items-center border-0 border-r-2 border-r-gray-200 pr-6">
                                <div class="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg mb-3 flex items-center justify-center">
                                    <i class="pi pi-image text-white text-2xl"></i>
                                </div>
                                <p class="text-sm text-gray-600 text-center mb-2">Televisión</p>
                                <p class="text-3xl font-bold text-[#2A2A2A]">45 <span class="text-base font-normal text-gray-500">und.</span></p>
                            </div>

                            <!-- Item 3-->
                            <div class="flex flex-col items-center">
                                <div class="w-32 h-32 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg mb-3 flex items-center justify-center">
                                    <i class="pi pi-image text-white text-2xl"></i>
                                </div>
                                <p class="text-sm text-gray-600 text-center mb-2">Auidifonos</p>
                                <p class="text-3xl font-bold text-[#2A2A2A]">32 <span class="text-base font-normal text-gray-500">und.</span></p>
                            </div>
                        </div>
                    </div>
                </template> 
            </Card>
        </div>
        <div class="flex px-10 pb-10">
            <GraficoLinea />
        </div>
        <div class="flex flex-row">
            <ProductReport />
            <CategoryReport />
        </div>
    </div>
</template>




<script setup>  


import 'primeicons/primeicons.css'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import GraficoLinea from '@/components/GraficoLinea.vue';
import GraficoCircular from '@/components/GraficoCircular.vue';
import ProductReport from '@/components/Reports/ProductReport.vue';
import CategoryReport from '@/components/Reports/CategoryReport.vue';
</script>



<style scoped>
.sales {
    box-shadow: 0 5px 5px -3px rgba(0,0,0,0.1), 0 0px 7px -1px rgba(0,0,0,0.05);
}

:deep(.p-card-body) {
  padding: 0.75rem !important;
}
</style>