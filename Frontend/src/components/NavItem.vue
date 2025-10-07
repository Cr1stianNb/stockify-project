
<template>
    <a v-ripple class="flex gap-3 items-center cursor-pointer px-4 py-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
        <i :class="primeIcon"></i>
        <span>{{ label }}</span>
    </a>
</template>


<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    label: String,
    primeIcon: String
})

</script>



