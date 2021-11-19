<template>
<div>
  <Header :onDetalles="true"></Header>
  Enlistando informacion:

  <p>
    Código bursátil: {{actionInfo[0].symbol}}
    <br>
    Nombre del activo: {{actionInfo[0].shortName}}
    <br>
    24hrs Change: {{actionInfo[0].regularMarketChangePercent}}%
    <br>
    Precio: {{actionInfo[0].regularMarketPrice}}$
    <br>
    Market Cap: {{actionInfo[0].marketCap}}$
    <br>
    Mínimo diario: {{actionInfo[0].regularMarketDayLow}}$
    <br>
    Maximo diario: {{actionInfo[0].regularMarketDayHigh}}$
  </p>



</div>
</template>

<script>
import {
  db
} from '../db'
import axios from 'axios'
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth
} from "firebase/auth"
import Header from './Header.vue'

export default {
  data() {
    return {
      action: "",
      actionInfo: []
    }
  },

  components: {
    Header,
  },

  created: async function() {
    this.action = this.$route.params.symbol,
      this.getActions(this.action)

  },

  methods: {
    getActions: async function(symbo) {
      var options = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote',
        params: {
          symbols: symbo
        },
        headers: {
          'x-api-key': /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3'
        }
      }
      const array = await axios.request(options)
      this.actionInfo = array.data.quoteResponse.result
      console.log(this.actionInfo)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
