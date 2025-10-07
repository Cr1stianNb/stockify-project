<template>
    <div class="sidebar p-drawer w-67 h-full flex flex-col flex-shrink-0">
        <div class="p-drawer-header">
            <div class="p-drawer-title">
                Stockify
            </div>
        </div>
        <div class="p-drawer-content">
            <div class="flex flex-col h-full">
                    <div
                        :class="selected == items.DASHBOARD ? 'bg-[#1D181C] text-white' : '' "
                        @click="selected = items.DASHBOARD; changeView(items.DASHBOARD)"
                        v-ripple
                        class="p-4 py-4 m-0 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                    >
                        <span class="font-medium">DASHBOARD</span>
                    </div>
            
                    <!-- INVENTARIO -->
                    <ul class="list-none p-0 m-0">
                        <li>
                            <div    
                                v-ripple
                                :class="selected == items.INVENTORY ? 'bg-[#1D181C] text-white' : '' "
                                @click="inventoryExpanded = !inventoryExpanded"
                                class="px-4 py-6 m-0 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                            >
                                <span class="font-medium">INVENTARIO</span>
                                <i :class="inventoryExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
                            </div>
                            <Transition name="slide"
                            >
                                <ul 
                                    @click="selected = items.INVENTORY;"
                                    v-if="inventoryExpanded" 
                                    class="list-none m-0 overflow-hidden"
                                >
                                    <li class="pl-2" :class="selected == items.INVENTORY && subselected === InventorySubItems.PRODUCT ? 'bg-[#e8eef7] text-[#1e3a8a]' : '' " @click="changeView(items.INVENTORY, InventorySubItems.PRODUCT)"><NavItem label="Producto" primeIcon="pi pi-box" /></li>
                                    <li class="pl-2" :class="selected == items.INVENTORY && subselected === InventorySubItems.CATEGORY ? 'bg-[#e8eef7] text-[#1e3a8a]' : '' " @click="changeView(items.INVENTORY, InventorySubItems.CATEGORY)"><NavItem label="Categorías" primeIcon="pi pi-tag" /></li>
                                    <li class="pl-2" :class="selected == items.INVENTORY && subselected === InventorySubItems.MOVEMENT ? 'bg-[#e8eef7] text-[#1e3a8a]' : '' " @click="changeView(items.INVENTORY, InventorySubItems.MOVEMENT)"><NavItem label="Movimientos" primeIcon="pi pi-arrow-right-arrow-left" /></li>
                                </ul>
                            </Transition>
                        </li>
                    </ul>

                    <!-- REPORTES -->
                    <!--
                    <ul class="list-none m-0">
                        <li>
                            <div
                                v-ripple
                                :class="selected == items.REPORTS ? 'bg-[#1D181C] text-white' : '' "
                                @click="reportsExpanded = !reportsExpanded"
                                class="px-4 py-6 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                            >
                                <span class="font-medium">REPORTES</span>
                                <i :class="reportsExpanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
                            </div>
                            <Transition name="slide">
                                <ul 
                                    v-if="reportsExpanded" 
                                    class="list-none pl-2 m-0 overflow-hidden"
                                >
                                    <li @click="changeView(items.REPORTS, ReportSubItem.PROFFIY_BY_PRODUCT)"><NavItem label="Ventas Por Producto" primeIcon="pi pi-chart-bar" /></li>
                                    <li @click="changeView(items.REPORTS, ReportSubItem.PROFFIT_BY_CATEGORY)"><NavItem label="Ventas por Categoría" primeIcon="pi pi-tags" /></li>
                                    <li><NavItem label="Reporte Financiero" primeIcon="pi pi-dollar" /></li>
                                </ul>
                            </Transition>
                        </li>
                    </ul>
                    
                    -->
                
                <div class="mt-auto">
                    <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
                    <a v-ripple class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                        <span>
                            Cristian Nettle
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>  
import { ref } from 'vue';
import 'primeicons/primeicons.css'
import NavItem from "@/components/NavItem.vue";
import { InventorySubItems } from '@/enums/InventorySubItem'
import { EnumSidebarItem as items } from '@/enums/SidebarItem';
import { ReportSubItem } from '@/enums/ReportSubItem';

const inventoryExpanded = ref(true);
const reportsExpanded = ref(false);


const selected = ref(items.DASHBOARD)
const subselected = ref('')

const emit = defineEmits(['change-view'])

const changeView = (view, subView = null) => {
    console.log(view, subView)
    selected.value = view
    if(subView) {
        subselected.value = subView
    }
    emit('change-view', { view, subView })
}
</script>


<style scoped>

.slide-enter-active,
.slide-leave-active {
    max-height: 500px;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.sidebar {
    border-inline-end-width: 1px;
}
.p-drawer  {
    display: flex;
    flex-direction: column;
    transform: translate3d(0px, 0px, 0px);
    position: relative;
    transition: transform 0.3s;
    background: #ffffff;
    color: #334155;
    border: 1px solid #e2e8f0;
    border-left: none;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.1);
}

.p-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: 1.5rem;
}
.p-drawer-title {
    font-weight: 600;
    font-size: 1.5rem;
}

.p-drawer-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    flex-grow: 1;
}

.p-4, .px-4 {
    transition: background-color 0.2s ease, color 0.2s ease;
}

</style>