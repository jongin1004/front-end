require('./bootstrap');

import { createApp } from 'vue'
import Main from './components/Main.vue';
import Covid from './components/Covid.vue';

const app = createApp({});
app.component('main-page', Main)
    .component('covid-page', Covid)
    .mount('#app');

