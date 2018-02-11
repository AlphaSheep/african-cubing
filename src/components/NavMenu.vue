<template>
  <div class="nav-menu">
    <h1><router-link to="/">{{title}}</router-link></h1>
    <ul>
      <li v-for="item in items">
        <router-link :to="item.route" class="nav-item" active-class="active" exact>
          {{ item.title }}
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      title: 'African Cubing Association',
      items: [
        {title: "Home", route: "/"},
        {title: "Competitions", route: "/competitions"},
        {title: "Results", route: "/results"},
        {title: "Records", route: "/records"},
        {title: "About", route: "/about"}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-menu {
    display: flex;
    width: 100%;
    position: fixed;
    top: 0;

    margin: 0;

    height: 56px;
    border-bottom: 1px solid black;

    background-color: #111;
    vertical-align: middle;
  }

  h1 {
    display: table-cell;
    vertical-align: middle;
    font-size: 1em;
    padding: 0px 10px;
    margin: 0;
  }

  ul {
    display: inline-block;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: inline-block;
    /*float:right;*/
    /*border: 1px solid lime;*/
  }

  a {
    display: table-cell;

    height: 56px;
    margin: 0;
    padding: 0px 20px;

    vertical-align: middle;

    color: #adb;
    text-decoration: none;
  }

  .active {
    color: #9fa;
    background-color: #132;
    font-weight: bold;
  }
</style>
1
1
