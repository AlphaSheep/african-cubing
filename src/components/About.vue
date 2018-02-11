<template>
  <div class="about">
    <div class="header">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      title: 'About'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h1 {
    font-weight: normal;
  }


</style>
