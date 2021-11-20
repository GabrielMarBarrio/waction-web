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
            'x-api-key': /*'HiM52JbWwbaeAZkIE8Hhm4gsVEuwpMpf6GH938Vi' */ /* 'PuVH8SoMIv8bs36EjW8s2aDlXXATRXXX4r4uNCJ3' */ 'u6XglktVTx63p2wNwp45U5RmDGMPkQEL6bTfKsNV'
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
      this.$router.push({
        name: "Detalles",
        params: {
          symbol: suggest
        }
      })
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
