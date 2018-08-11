import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './page/Home.vue';

Vue.use(VueRouter);

let routes = [
    { path: '/', component: Home },
];

let router = new VueRouter({ routes });

export default router;
