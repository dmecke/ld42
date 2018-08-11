import Vue from 'vue';
import App from './component/App.vue';

import i18n from './i18n';
import store from './store';
import router from './router';

import './vuetify';
import './app.scss';

new Vue({
    el: '#app',
    store,
    router,
    i18n,
    render: h => h(App),
});
