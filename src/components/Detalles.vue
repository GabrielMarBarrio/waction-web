<template>
  <div>
    Enlistando informacion:
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

  </div>
</template>

<script>
import { db } from '../db'
import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"

export default {
  data () {
    return {
      actions: []
    }
  },

  created: async function(){

    var userCodes = ['AAPL','TSLA']
    this.actions = await this.getActions(userCodes)

  },

  methods: {

    getActions: async function(userCodes){
      var options = {
        method: 'GET',
        url: 'https://rest.yahoofinanceapi.com/v6/finance/quote',
        params: {symbols: userCodes.join(',')},
        headers: {
          'x-api-key': 'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi'
        }
      }
      const array = await axios.request(options)
      return array.data.quoteResponse.result
    },

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
