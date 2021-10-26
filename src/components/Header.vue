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
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="watchlist">WatchList</a>
        </li>
        <li>
          <a href="detalles">Detalles</a>
        </li>
        <li>
          <a href="login">Iniciar Sesión</a>
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
  name: 'Header'
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
