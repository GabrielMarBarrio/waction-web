<template>
  <div>
    <Header :onDetalles="true"></Header>
    Enlistando informacion:
    <!--
    <span v-for="(doc, index) in actions" v-bind:key="index">
      <p>
        Código bursátil: {{doc.symbol}}

        Nombre del activo: {{doc.displayName}}

        24hrs Change: {{doc.regularMarketChangePercent}}%

        Precio: {{doc.postMarketPrice}}$

        Market Cap: {{doc.marketCap}}$

        Mínimo diario: {{doc.regularMarketDayLow}}$

        Maximo diario: {{doc.regularMarketDayHigh}}$
      </p>
      <div></div>
    </span>
    -->

  </div>
</template>

<script>
import { db } from '../db'
import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import Header from './Header.vue'

export default {
  data () {
    return {
      actions: []
    }
  },

  components: {
    Header,
  },

  created: async function(){


  },

  methods: {


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
