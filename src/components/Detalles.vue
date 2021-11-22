<template>
<div v-if="user.hasOwnProperty('uid')">
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
  <div id="chart">
    <apexchart type="candlestick" height="350" :options="chartOptions" :series="series"></apexchart>
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

import VueApexCharts from 'vue-apexcharts'

export default {
  data() {
    return {
      action: "",
      actionInfo: [],
      description: "",
      descriptionExist: true,
      isFavorite: false,
      series: [{
        data: [] 
      }],
      chartOptions: {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: '',
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }       
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
    await this.getSeries(this.action)
    //console.log(this.series)

  },

  methods: {
    getSeries: async function(symbo) {
      var options = {
        method: 'GET',
        url: "https://yfapi.net/v8/finance/chart/" + symbo + "?comparisons=MSFT&range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit",
        params: {
          symbols: symbo
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
          //'x-api-key': 'SlIlTS3UHr9ee9E1IknX588gIwIvdoUk1D0Kk2Nq'
          //'x-api-key': 'aA0X2RMHCV4Nrox2js0GG17b6WB8zTcv5mDab1iS'
          'x-api-key': '5iqrHeCZwftPeEFZVaTU9jFNobVzko66EM9BW7Hh'
          //'x-api-key': 'hRHIuVjOzp1FHnYKpxxu77pcQuQ6hEiqBxPsn070'
          //'x-api-key': 'D4dX495PNi4a9e4AlTFPAaCKkj11sqSO44I44VSF'
        }
      }
      const array = await axios.request(options)
      var data = JSON.stringify(array)
      data = JSON.parse(data)

      //console.log(data.data.chart.result[0])
      //console.log("arrlen: " + arrlen)
      
      let arrlen = data.data.chart.result[0].timestamp.length

      let dummydata = []

      for(let i = 0; i < arrlen; i++) {
        dummydata[i] = {
          x: new Date(data.data.chart.result[0].timestamp[i]),
          y: [data.data.chart.result[0].indicators.quote[0].open[i],
              data.data.chart.result[0].indicators.quote[0].high[i],
              data.data.chart.result[0].indicators.quote[0].low[i],
              data.data.chart.result[0].indicators.quote[0].close[i] ]         
        }
      }

      this.$set(this.series[0], 'data', dummydata)
      //this.series[0].data = dummydata

      console.log("This series: \n")
      console.log(this.series)
    },    

    getActions: async function(symbo) {
      var options = {
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote',
        params: {
          symbols: symbo
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
          //'x-api-key': 'SlIlTS3UHr9ee9E1IknX588gIwIvdoUk1D0Kk2Nq'
          //'x-api-key': 'aA0X2RMHCV4Nrox2js0GG17b6WB8zTcv5mDab1iS'
          //'x-api-key': '5iqrHeCZwftPeEFZVaTU9jFNobVzko66EM9BW7Hh'
          'x-api-key': 'hRHIuVjOzp1FHnYKpxxu77pcQuQ6hEiqBxPsn070'
          //'x-api-key': 'D4dX495PNi4a9e4AlTFPAaCKkj11sqSO44I44VSF'
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
          //'x-api-key': 'SlIlTS3UHr9ee9E1IknX588gIwIvdoUk1D0Kk2Nq'
          //'x-api-key': 'aA0X2RMHCV4Nrox2js0GG17b6WB8zTcv5mDab1iS'
          //'x-api-key': '5iqrHeCZwftPeEFZVaTU9jFNobVzko66EM9BW7Hh'
          //'x-api-key': 'hRHIuVjOzp1FHnYKpxxu77pcQuQ6hEiqBxPsn070'
          'x-api-key': 'D4dX495PNi4a9e4AlTFPAaCKkj11sqSO44I44VSF'
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
      this.getSeries(this.action)
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
