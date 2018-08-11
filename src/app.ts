import Vue from 'vue';
import App from './component/App.vue';

import i18n from './i18n';
import store from './store';
import router from './router';

import './vuetify';
import './app.scss';
import {EventBus} from "./service/EventBus";

new Vue({
    el: '#app',
    store,
    router,
    i18n,
    render: h => h(App),
});

window.addEventListener('keyup', event => {
    switch (event.keyCode) {
        case 38:
        case 87:
            EventBus.$emit('movement', { direction: 'up' });
            break;

        case 40:
        case 83:
            EventBus.$emit('movement', { direction: 'down' });
            break;

        case 37:
        case 65:
            EventBus.$emit('movement', { direction: 'left' });
            break;

        case 39:
        case 68:
            EventBus.$emit('movement', { direction: 'right' });
            break;

        case 80:
            EventBus.$emit('pickup');
            break;
    }
});
