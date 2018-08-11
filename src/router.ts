import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './page/Home.vue';
import Game from './page/Game.vue';

Vue.use(VueRouter);

let routes = [
    { path: '/', component: Home },
    { path: '/game', component: Game },
];

let router = new VueRouter({ routes });

export default router;
