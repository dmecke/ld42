import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "./i18n/en.js";
import de from "./i18n/de.js";

Vue.use(VueI18n);

let messages = {en, de};

let locale = localStorage.getItem('ld42.locale');
if (!locale) {
    locale = navigator.language.substr(0, 2);
}
if (!locale) {
    locale = 'en';
}

export default new VueI18n({
    fallbackLocale: 'en',
    locale,
    messages
});
