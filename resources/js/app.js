require('./bootstrap');

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './components/App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios'; 
import { routes } from './routes';

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

app.use(router);

app.use(VueAxios, axios); 

app.mount('#app');
