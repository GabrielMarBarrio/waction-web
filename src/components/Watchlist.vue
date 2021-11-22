<template>
<div>
  <Header onWatchlist></Header>
  <h3>Watchlist</h3>
  <div>
    <h4>Acciones:</h4>
    <span v-for="(action, index) in actionsInfo" v-bind:key="index">
      <div v-bind:id=index>
        <img width="16" height="16" src=../assets/images/fav.png id="fav" @click="updateWatchList(action.symbol, index)"></img>
        <button @click="sendSymbol(action.symbol)">
           {{action.symbol}} ({{action.displayName}}): {{action.regularMarketPrice}} USD [{{action.regularMarketChangePercent}}]
        </button>
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
          'x-api-key': /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3' */ /*'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz'*/ /*     'x-api-key': /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3' */ /*'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz'*/ /*'6FRpNzPo591vXM5ri8Zgq1B3PDpOuYpTqgNAT7T4'*/ 'Nxsrr9ch5zLkI6PiE30B4mrLpYo0bw23hjUVzcx0'
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
