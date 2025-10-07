import type { ToastServiceMethods } from 'primevue/toastservice';
import { reactive } from 'vue';

export function useDialog(initialData = {}) {
  const state = reactive({
    show: false,
    data: { ...initialData },
    saving: false,
    
    open(data = initialData) {
      this.data = { ...data };
      this.show = true;
    },
    
    close() {
      this.show = false;
    },
    
    async save(callback : any, toast?: ToastServiceMethods) {
      this.saving = true;
      try {
        await callback(this.data);
        
        
        if (toast) {
          toast.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Operación completada correctamente',
            life: 3000
          });
        }
        this.close();
      } catch (error) {        
        console.error(error)
        if (toast) {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo completar la operación',
            life: 3000
          })
        }
      } finally {
        this.saving = false;
      }
    }
  });
  
  return state;
}
