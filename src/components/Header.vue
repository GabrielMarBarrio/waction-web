<template>
<header id="header">
  <div class="center">
    <!-- LOGO -->
    <div id="logo">
      <img src="../assets/images/logo.png" class="app-logo" alt="Logotipo" />

    </div>

    <!-- MENU -->
    <nav id="menu">
      <ul>
       
        <li>
          <a v-on:click="goToWatchlist()">WatchList</a>
        </li>
        <li>
          <a v-on:click="goToDetalles()">Detalles</a>
        </li>
        
      </ul>
    </nav>

    <!--LIMPIAR FLOTADOS-->
    <div class="clearfix"></div>
  </div>
</header>
</template>

<script>
export default {
  name: 'Header',

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
  }
}
</script>

<style scoped>
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
