import Vue from 'vue';
import Vuex from 'vuex';
import Map from "./domain/Map";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        map: Map.reset(),
    },
    mutations: {
    }
});
