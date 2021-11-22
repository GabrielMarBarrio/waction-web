<template>
<div>
  <Header onWatchlist></Header>
  <h3>Watchlist</h3>
  <div>
    <h4>Acciones:</h4>
    <span v-for="(action, index) in actionsInfo" v-bind:key="index">
      <div v-bind:id=index>
        <button class="button button2" @click="sendSymbol(action.symbol)">
           <span style="color:#28bc2a">{{action.symbol}}</span> ({{action.displayName}}): {{action.regularMarketPrice}} USD [{{action.regularMarketChangePercent}}]
        </button>
        <img width="20" height="20" src=../assets/images/fav.png id="fav" @click="updateWatchList(action.symbol, index)"></img>
        <br>
      </div>
    </span>
  </div>
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
import {
  mapState
} from 'vuex'
import {
  firestorePlugin
} from 'vuefire'
import {
  collection,
  getDoc,
  query,
  where,
  setDoc,
  doc
} from "firebase/firestore";

export default {
  name: "Watchlist",
  data() {
    return {
      actionsInfo: []
    }
  },

  components: {
    Header,
  },

  computed: mapState([
    'user'
  ]),

  created: function() {
    console.log(this.user),
      this.getActions(this.user.actions)

  },

  methods: {

    getActions: async function(userCodes) {
      var options = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote',
        params: {
          symbols: userCodes.join(',')
        },
        headers: {
          'x-api-key': 'YIN21cD0L08ImY8riIqji3qliCHtOs5p8vMWaUJ7'/*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3' */ /*'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz'*/ /*     'x-api-key': /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3' */ /* 'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz' */ /*'6FRpNzPo591vXM5ri8Zgq1B3PDpOuYpTqgNAT7T4'*/ /* 'ZV9PsSTYb02VX78B6t87saQCLLrAVTW15uBrKfRi' */
        }
      }
      const array = await axios.request(options)
      this.actionsInfo = array.data.quoteResponse.result
    },
    sendSymbol(symb) {
      this.$router.push({
        name: "Detalles",
        params: {
          symbol: symb
        }
      })
    },
    updateWatchList: async function(action, indx) {
      this.user.actions.splice(this.user.actions.indexOf(action), 1),
        document.getElementById(indx).remove(),
        await setDoc(doc(collection(db, "users"), this.user.uid), {
          actions: this.user.actions,
        }, {
          merge: true
        })
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: 90;
}
h3{
  color: #28bc2a;
  font-size: 40px;
}
h4{
  color: black;
  font-size: 25px;
  font-weight: 900;
}
ul {
  list-style-type: none;
  padding: 0;
}
#kpd{
  color: #28bc2a;
  font-size: 16px;
  font-weight: 900;
}
.button {
  background-color: white; /* Green */
  border: none;
  border-radius: 8px;
  color: black;
  padding: 15px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  width: 700px;
}
.button2:hover {
  box-shadow: 0 5px 5px 0 rgba(0,0,0,0.24),0 5px 5px 0 rgba(0,0,0,0.19);
}
li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
