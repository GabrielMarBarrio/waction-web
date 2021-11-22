<template>
<div>
  <Header :onDetalles="true" @actualizarDetalles="refrescarDetalles"></Header>
  <img v-if="isFavorite" src=../assets/images/fav.png id="fav" @click="updateWatchList()"></img>
  <img v-if="!isFavorite" src=../assets/images/noFav.png id="fav" @click="updateWatchList()"></img>
  <br><button @click="goToWatchList()"> <--- </button>
  <h3>Detalles:</h3>
  <p>
    {{actionInfo[0][0].symbol}} ({{actionInfo[0][0].shortName}})&nbsp&nbsp&nbsp&nbsp
    [+/-]{{actionInfo[0][0].regularMarketChangePercent}}%&nbsp&nbsp&nbsp&nbsp
    @${{actionInfo[0][0].regularMarketPrice}}
    MIN: ${{actionInfo[0][0].regularMarketDayLow}} MAX: ${{actionInfo[0][0].regularMarketDayHigh}}
    &nbsp&nbsp&nbsp&nbspCAP: ${{actionInfo[0][0].marketCap}}<br>
    Description: {{actionInfo[1][0].assetProfile.longBusinessSummary}}
  </p>
  <h3>Gráfica:</h3>
  <img src="@/assets/images/chart.png" width="35%" />
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
  data() {
    return {
      action: "",
      actionInfo: [],
      isFavorite: false
    }
  },

  components: {
    Header,
  },
  computed: mapState([
    'user'
  ]),


  created: async function() {
    this.action = this.$route.params.symbol,
      this.getActions(this.action)
    if (this.user.actions.includes(this.action)) {
      this.isFavorite = true
    }
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
          'x-api-key': /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3'*/ /* 'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz'*/ 'ZV9PsSTYb02VX78B6t87saQCLLrAVTW15uBrKfRi' /* '6FRpNzPo591vXM5ri8Zgq1B3PDpOuYpTqgNAT7T4'*/
        }
      }
      const array = await axios.request(options)
      this.actionInfo.push(array.data.quoteResponse.result)

      var ex = 'https://yfapi.net/v11/finance/quoteSummary/'+symbo
      var options2 = {
        method: 'GET',
        url: ex,
        params: {
          modules: 'assetProfile'
        },
        headers: {
          'x-api-key': /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3'*/ /* 'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz'*/ 'ZV9PsSTYb02VX78B6t87saQCLLrAVTW15uBrKfRi' /* '6FRpNzPo591vXM5ri8Zgq1B3PDpOuYpTqgNAT7T4'*/
        }
      }
      const array2 = await axios.request(options2)
      console.log(array2)
      this.actionInfo.push(array2.data.quoteSummary.result)
    },
    updateWatchList: async function() {
      if (!this.user.actions.includes(this.action)) {
        this.isFavorite = true,
          this.user.actions.push(this.action),
          await setDoc(doc(collection(db, "users"), this.user.uid), {
            actions: this.user.actions,
          }, {
            merge: true
          })
      } else {
        this.isFavorite = false,
          this.user.actions.splice(this.user.actions.indexOf(this.action), 1),
          await setDoc(doc(collection(db, "users"), this.user.uid), {
            actions: this.user.actions,
          }, {
            merge: true
          })
      }
    },
    refrescarDetalles(value){
      this.action = value
      this.isFavorite = false;
      this.getActions(this.action)
      if (this.user.actions.includes(this.action)) {
        this.isFavorite = true
      }
    },
    goToWatchList(){
      this.$router.push({name: "Watchlist"})
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
