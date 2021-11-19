<template>
<div>
  <Header onWatchlist></Header>
  watchlist
  <div>
    Acciones:
    <span v-for="(action, index) in actionsInfo" v-bind:key="index">
      <p>
        Accion no. {{index + 1}}
      </p>

      <p @click="sendSymbol(action.symbol)">

        Simbolo: {{action.symbol}}
      </p>
      <p>
        Precio: {{action.ask}}
      </p>
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
          'x-api-key': /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ 'yJr0Oo6vNO5K6LwQRB3ww2oByOQS1uji4d5HVBDz'
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
