// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Index from '@/components/Index'
import Detalles from '@/components/Detalles'
import Watchlist from '@/components/Watchlist'
import { firestorePlugin } from 'vuefire';
import { GoogleAuthProvider } from "firebase/auth"

import { db } from './db'
import { collection, getDoc, query, where, setDoc, doc } from "firebase/firestore";

import VueApexCharts from 'vue-apexcharts'
import '@/plugins/apexcharts'

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

const store = new Vuex.Store({
  state: {
    user: {},
  },

  mutations: {
    setUser (state, value) {
      state.user = value;
    },
  },

  actions: {
    login: async function(context, info){

      let user = {};
      user.uid = `${info.uid}`
      user.name = `${info.displayName}`
      user.email = `${info.email}`
      user.photoURL = `${info.photoURL}`
      user.accessToken = `${info.accessToken}`
      //user.actions = `${info.actions}`

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if(typeof(docSnap.data().actions) === "string") {
          user.actions = docSnap.data().actions.split(',')
        } else {
          user.actions = docSnap.data().actions
        }
      } else {
        user.actions = []
      }

      await setDoc(doc(collection(db, "users"), `${user.uid}`), {
        name: `${user.name}`,
        email: `${user.email}`,
        photoURL: `${user.photoURL}`,
        accessToken: `${user.accessToken}`,
        actions: `${user.actions}`
      }, {merge:true})

      context.commit('setUser', user)

    },
    logout (context){
      context.commit('setUser', {})

    }
  }
})

const routes = [
  {path: '/watchlist',component: Watchlist, name: "Watchlist"},
  {path: '/detalles',component: Detalles, name: "Detalles"},
  {path: '/',component: Index, name: "Index"},
];
const router = new VueRouter({
  routes,
  mode: 'history'
});
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  store: store,
}).$mount('#app')
