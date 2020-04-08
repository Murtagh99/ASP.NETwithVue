import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.config.productionTip = true;

var router = new VueRouter();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
