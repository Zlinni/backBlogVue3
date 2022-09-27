import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import './index.css'
// import 'bytemd/dist/index.css'
import { createPinia } from 'pinia'
const pinia = createPinia();
const app = createApp(App)
app.use(router).use(pinia).mount('#app')
