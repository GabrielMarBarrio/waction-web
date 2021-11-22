<template>
<header id="header">
  <div class="center">
    <!-- LOGO -->
    <div id="logo">
      <img src="../assets/images/logo.png" class="app-logo" alt="Logotipo" />

    </div>

    <nav id="menu">
      <ul>
        <li>
          <a v-on:click="goToWatchlist()">Watchlist</a>
        </li>

        <li>
          <vue-simple-suggest
            v-model="chosen"
            :list="simpleSuggestionList"
            :filter-by-query="false"
            :max-suggestions="5"
            @suggestion-click="onSuggestClick">
          </vue-simple-suggest>
        </li>
        <li>
          <div id="profile-pic" @click.prevent.stop="handleClick($event)">
            <img v-bind:src="user.photoURL" />
          </div>
        </li>

      </ul>
    </nav>
    <vue-simple-context-menu
      :elementId="'myUniqueId'"
      :options="options"
      :ref="'vueSimpleContextMenu'"
      @option-clicked="optionClicked"
    />

  <br>

    <!--LIMPIAR FLOTADOS-->
    <div class="clearfix"></div>
  </div>
</header>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css' // Optional CSS
import axios from 'axios'
import { mapState } from 'vuex'
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";
import VueSimpleContextMenu from "vue-simple-context-menu";

export default {
  name: 'Header',
  components: {
    VueSimpleSuggest,
    VueSimpleContextMenu
  },

  data() {
    return {
      chosen: '',
      suggestions: [],
      options: [
        {
          name: 'Cerrar Sesion',
          slug: 'cerrar-sesion',
        }
      ]
    }
  },

  computed: mapState([
    'user'
  ]),

  props: {
    onWatchlist: {
      type: Boolean,
      default: false
    },
    onDetalles: {
      type: Boolean,
      default: false
    }
  },

  methods: {

    goToWatchlist: function(){
      if(!this.onWatchlist){
        this.$router.push({name: "Watchlist"})
      }
    },
    goToDetalles: function(){
      if(!this.onDetalles){
        this.$router.push({name: "Detalles"})
      }
    },
    simpleSuggestionList(inputValue) {
      return new Promise((resolve, reject) => {
        var options = {
          method: 'GET',
          url: 'https://yfapi.net/v6/finance/autocomplete',
          params: {query: `${inputValue}`, lang: 'en'},
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
          'x-api-key': 'aA0X2RMHCV4Nrox2js0GG17b6WB8zTcv5mDab1iS'
          //'x-api-key': '5iqrHeCZwftPeEFZVaTU9jFNobVzko66EM9BW7Hh'
          //'x-api-key': 'hRHIuVjOzp1FHnYKpxxu77pcQuQ6hEiqBxPsn070'
          //'x-api-key': 'D4dX495PNi4a9e4AlTFPAaCKkj11sqSO44I44VSF'
          }
        }
        axios.request(options).then(function (response) {
          let array = [];
          response.data.ResultSet.Result.forEach(element => {
            array.push(element.symbol)
          });
          resolve(array)
        })
      })
    },
    handleClick (event) {
      this.$refs.vueSimpleContextMenu.showMenu(event)
    },
    optionClicked (event) {
      console.log("hola")
      this.$store.dispatch('logout')
      this.$router.push({name:"Index"})
    },
    onSuggestClick (suggest, e) {
      if(!this.onDetalles){
        this.$router.push({
          name: "Detalles",
          params: {
            symbol: suggest
          }
        })
      }else{
        this.$emit('actualizarDetalles', suggest)
      }
    },


  }
}
</script>

<style scoped>

#waction {
  float:left;
  height: 46px;
  line-height: 85px;
}

#profile-pic {
    width: 30%;
    font-size: 28px;
    float: right;
    margin-top: 35px;
}

#profile-pic img {
    display: block;
    float: right;
    height: 80px;
    margin-top: -35px;
    margin-right: 1px;
    border-radius: 50%;

}
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
