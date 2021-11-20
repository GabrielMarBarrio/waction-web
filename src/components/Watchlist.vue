<template>
<div>
  <Header onWatchlist></Header>
  <h3>Watchlist</h3>
  <div>
    <h4>Acciones:</h4>
    <span v-for="(action, index) in actionsInfo" v-bind:key="index">
      <button id="asset" @click="sendSymbol(action.symbol)">  
          {{action.symbol}} ({{action.displayName}}): {{action.regularMarketPrice}} USD [{{action.regularMarketChangePercent}}]
      </button>
      <br>
    </span>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import {
  mapState
} from 'vuex'
import Header from './Header.vue'

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
    console.log(this.user)

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
          'x-api-key': /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3' */ 'u6XglktVTx63p2wNwp45U5RmDGMPkQEL6bTfKsNV'
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
