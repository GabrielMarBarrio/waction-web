<template>
<div>
  <Header :onDetalles="true" @actualizarDetalles="refrescarDetalles"></Header>
  <button class="button button2" @click="goToWatchList()"> Regresar </button>
  <br>
  <br>
  <br>
  <p>
    <h1>{{actionInfo.symbol}} ({{actionInfo.shortName}})&nbsp&nbsp&nbsp&nbsp</h1>
    <img width="50px" v-if="isFavorite" src=../assets/images/fav.png id="fav" @click="updateWatchList()"></img>
    <img width="50px" v-if="!isFavorite" src=../assets/images/noFav.png id="fav" @click="updateWatchList()"></img>
    <br>
    <h2>
      [+/-]{{actionInfo.regularMarketChangePercent}}%&nbsp&nbsp&nbsp&nbsp
      @${{actionInfo.regularMarketPrice}}
      MIN: ${{actionInfo.regularMarketDayLow}} MAX: ${{actionInfo.regularMarketDayHigh}}
      &nbsp&nbsp&nbsp&nbspCAP: ${{actionInfo.marketCap}}
    </h2>
    <br>
    <p v-if="descriptionExist"> <span style="font-weight:bolder">Description:</span> {{description}} </p>
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
      description: "",
      descriptionExist: true,
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
          'x-api-key': '54dcfF0kfO9N10vcrzKGckVQMVAMyVF7PINjpWk9' /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3'*/ /* 'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz'*/ /* 'ZV9PsSTYb02VX78B6t87saQCLLrAVTW15uBrKfRi' /* /* '6FRpNzPo591vXM5ri8Zgq1B3PDpOuYpTqgNAT7T4'*/ /* 'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz' */
        }
      }
      const array = await axios.request(options)
      this.actionInfo = array.data.quoteResponse.result[0]

      var ex = 'https://yfapi.net/v11/finance/quoteSummary/'+symbo
      var options2 = {
        method: 'GET',
        url: ex,
        params: {
          modules: 'assetProfile'
        },
        headers: {
          'x-api-key': '54dcfF0kfO9N10vcrzKGckVQMVAMyVF7PINjpWk9' /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3'*/ /* 'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz'*/ /* 'ZV9PsSTYb02VX78B6t87saQCLLrAVTW15uBrKfRi' /* /* '6FRpNzPo591vXM5ri8Zgq1B3PDpOuYpTqgNAT7T4'*/ /* 'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz' */
        }
      }
      const array2 = await axios.request(options2)
      try {
        this.description = array2.data.quoteSummary.result[0].assetProfile.longBusinessSummary
        this.descriptionExist = true
      }
      catch (e) {
          this.descriptionExist = false
      }

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
.button {
  background-color: #42b983; /* Green */
  border: none;
  border-radius: 8px;
  color: white;
  padding: 15px 20px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  width: 200px;
  font-weight:900;
  align-items: baseline;
  float:left;
}
.button2:hover {
  box-shadow: 0 5px 5px 0 rgba(0,0,0,0.24),0 5px 5px 0 rgba(0,0,0,0.19);
}
h2{
  color:#black;
  font-weight: bolder;
  font-size: 18px;
}
h1 {
  color:#42b983;
  font-weight: bolder;
}
p{
  margin-left: 400px;
  margin-right: 400px;

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
