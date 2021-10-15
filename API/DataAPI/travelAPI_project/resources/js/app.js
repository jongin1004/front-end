require('./bootstrap');

import { createApp } from 'vue'
import Main from './components/Main.vue';
import Covid from './components/Covid.vue';
import StatusOfEntry from './components/StatusOfEntry.vue';

const app = createApp({});
app.component('main-page', Main)
    .component('covid-page', Covid)
    .component('status-of-entry', StatusOfEntry)    
    .mount('#app');

