<template>
  <div>
    <span v-for="(doc, index) in documents" v-bind:key="index"> 
      {{doc.nombre}} 
      {{doc.apellido}}
    </span>
    <button v-on:click="googlePopUp()">
      
    </button>
  </div>
</template>

<script>
import { db } from '../db'
import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"

export default {
  data () {
    return {
      documents: [],
      actions: []
    }
  },

  created: async function(){
    
    this.documents = await this.getDocuments()
    //var userCodes = ['AAPL','BTC']
    //this.actions = await this.getActions(userCodes)
    
  },

  methods: {
    getDocuments: async function(){
      const querySnapshot = await db.collection('documents').get()
      return querySnapshot.docs.map(doc => doc.data())
    },

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

    googlePopUp: async function(){
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log(result.user)
    }
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
