<template>
  <div id="app">
    <nav-menu/>
    <router-view/>
  </div>
</template>

<script>

import NavMenu from './components/NavMenu';

export default {
  name: 'App',
  components: {
    NavMenu
  }
}
</script>

<style>

@font-face {
    font-family: 'open_sanslight';
    src: url('./assets/fonts/OpenSans-Light-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

#app {
  font-family: 'open_sanslight', sans-serif;
  /*font-size: 1.1em;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background-color: #000;
  color: #eee;
  margin: 56px 0 0 0;
}

.header {
  color: #ced;
  height: 100px;
  padding: 20px;
  background-color: #222;
  border-bottom: 1px solid black;
}

</style>
