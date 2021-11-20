<template>
  <div>
    <br><h1><i><b>Welcome to Waction</b></i></h1>
    <img src="@/assets/images/logo.png" width="20%"/><br>
    <button v-on:click="checkUser()" :disabled="cargando" id="asset">
      Autentificar con Google
    </button>
    <h2 v-if="cargando">
      Cargando...
    </h2>
  </div>
</template>

<script>
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"


export default {
  name: "Index",
  data () {
    return {
      cargando: false
    }
  },

  created: async function(){

  },

  methods: {

    googlePopUp: async function(){
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      return user
    },

    checkUser: async function(){
      let info = await this.googlePopUp();
      this.cargando = true
      await this.$store.dispatch('login', info)
      this.$router.push({name: "Watchlist"})
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
