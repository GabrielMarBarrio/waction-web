// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Detalles from '@/components/Detalles'
import { firestorePlugin } from 'vuefire';
import { GoogleAuthProvider } from "firebase/auth"

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(VueRouter);
const routes = [
  {path: '/detalles',component: Detalles},
  {path: '/',component: HelloWorld}
];
const router = new VueRouter({
  routes,
  mode: 'history'
});
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
