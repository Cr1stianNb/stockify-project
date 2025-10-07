<template>
    <div class="flex items-center justify-center px-10 pb-10 w-full h-full">
        <GraficoBarra 
            title="Ganancias por Categoría"
            :labels="['Categoría A', 'Categoría B', 'Categoría C']"
            :data="[2500, 234, 234234]"
            data-label="Ganancias ($)"
            bar-color="#3b82f6"
        />
    </div>
</template>



<script setup>
import GraficoBarra from '../GraficoBarra.vue';




</script>