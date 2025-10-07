<template>
    <div class="flex w-full h-dvh">
        
        <div class="sticky top-0 h-dvh flex-shrink-0">
            <Sidebar @change-view="handleViewChange"/>
        </div>
        <Dashboard v-if="selected == EnumSidebarItem.DASHBOARD" />
        <Inventory v-if="selected == EnumSidebarItem.INVENTORY" :subView="subselected"/>
        <Report v-if="selected == EnumSidebarItem.REPORTS" :subView="subselected" />
    </div>
</template>



<script setup>  
import 'primeicons/primeicons.css'
import Sidebar from '@/components/Sidebar.vue';
import Dashboard from './Dashboard.vue';
import Inventory from './Inventory.vue';
import Report from './Report.vue';
import { ref } from 'vue';
import { EnumSidebarItem } from '@/enums/SidebarItem';


const selected = ref(EnumSidebarItem.DASHBOARD)
const subselected = ref(null)

const handleViewChange = (data) => {
    console.log(data)
    selected.value = data.view
    if(data.subView) {
        subselected.value = data.subView
    }
}


</script>

