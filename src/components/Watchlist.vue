<template>
<div v-if="user.hasOwnProperty('uid')">
  <Header onWatchlist></Header>
  <h3>Watchlist</h3>
  <div>
    <h4>Acciones:</h4>
    <span v-for="(action, index) in actionsInfo" v-bind:key="index">
      <div v-bind:id=index>
        <button class="button button2" @click="sendSymbol(action.symbol)">
           <span style="color:#42b983">{{action.symbol}}</span> ({{action.displayName}}): {{action.regularMarketPrice}} USD [{{action.regularMarketChangePercent}}]
        </button>
        <img width="25" src=../assets/images/fav.png id="fav" @click="updateWatchList(action.symbol, index)"></img>
        <br>
      </div>
    </span>
  </div>
</div>
<div v-else>
  <h3>Error: missing user!</h3>
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
          //'x-api-key': 'ZV9PsSTYb02VX78B6t87saQCLLrAVTW15uBrKfRi'
          //'x-api-key': '54dcfF0kfO9N10vcrzKGckVQMVAMyVF7PINjpWk9'
          //'x-api-key': 'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi'
          //'x-api-key': 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3'
          //'x-api-key': 'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz'
          //'x-api-key': 'Nxsrr9ch5zLkI6PiE30B4mrLpYo0bw23hjUVzcx0'
          //'x-api-key': '6FRpNzPo591vXM5ri8Zgq1B3PDpOuYpTqgNAT7T4'
          //'x-api-key': 'UCSWF5lqXM2I7XN2UQnen8xZoZBMGmiD2hpGQNjW'
          //'x-api-key': 'G7rpWE6Hgm9RoDVvpw7Ao1lltasytUwi2PqbWVoC'
          //'x-api-key': 'rSs9TdadZz76hpFFBbm5L5UDJON3Ik6q1E0OUzgc'
          //'x-api-key': 'o7GjnLFmjw27tf4pr1YTB8oZ7hgKwJXh5Cucz6YT'
          //'x-api-key': 'GmE2pcNBU37R51H4s5vyl9guZapLKIem5xK4YALa'
          //'x-api-key': 'Yrr5r3YNmugU8ZiGoDvy2DS57KB6JNF6h3u7tB26'
          'x-api-key': 'SlIlTS3UHr9ee9E1IknX588gIwIvdoUk1D0Kk2Nq'
          //'x-api-key': 'aA0X2RMHCV4Nrox2js0GG17b6WB8zTcv5mDab1iS'
          //'x-api-key': '5iqrHeCZwftPeEFZVaTU9jFNobVzko66EM9BW7Hh'
          //'x-api-key': 'hRHIuVjOzp1FHnYKpxxu77pcQuQ6hEiqBxPsn070'
          //'x-api-key': 'D4dX495PNi4a9e4AlTFPAaCKkj11sqSO44I44VSF'
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
  font-weight: 900;
}
h3{
  color: #42b983;
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
