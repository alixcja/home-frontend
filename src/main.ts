import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { createPinia } from 'pinia'
import { router } from '../src/router/index'


const vuetify = createVuetify({
    components,
    directives,
  });
  
const pinia = createPinia()

createApp(App).use(vuetify).use(pinia).use(router).mount('#app')
