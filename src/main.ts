import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/lara-light-green/theme.css'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Calendar from 'primevue/calendar'
import 'primeicons/primeicons.css'
import AppTopbar from "@/components/AppTopbar.vue";
import 'normalize.css'

import '@/assets/styles.scss'

const app = createApp(App)
app.use(PrimeVue)
app.component('InputNumber', InputNumber)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('Calendar', Calendar)
app.component('AppTopbar', AppTopbar)


app.mount('#app')
