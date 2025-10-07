import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config'
import { Noir } from './presets/Noir'
import  Ripple  from 'primevue/ripple';
import StyleClass from 'primevue/styleclass'
import ToastService from 'primevue/toastservice' 



const app = createApp(App)
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Noir
    },
    ripple: true
} )

app.use(ToastService) 

app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)



app.mount('#app');
