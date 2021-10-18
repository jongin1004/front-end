require('./bootstrap');

import { createApp } from 'vue'
import Main from './components/Main.vue';
import Map from './components/Map.vue';

const app = createApp({});
app.component('main-page', Main)    
    .component('map-page', Map)
    .mount('#app');

