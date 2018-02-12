<template>
  <div class="competitions">
    <div class="header">
      <h1>{{ title }}</h1>
    </div>

    <h2>Upcoming Competitions</h2>
    <div class="competition-container">
      <!-- <h2>Upcoming Competitions</h2> -->
      <upcoming-competition-list/>
    </div>

    <h2>Recent Competitions</h2>

    <div class="competition-container">
      <!-- <h2>Upcoming Competitions</h2> -->
      <recent-competition-list/>
    </div>
  </div>


</template>

<script>

import UpcomingCompetitionList from '@/components/UpcomingCompetitionList';
import RecentCompetitionList from '@/components/RecentCompetitionList';

export default {
  name: 'Competitions',
  components: {
    RecentCompetitionList,
    UpcomingCompetitionList
  },
  data () {
    return {
      title: 'Competitions'
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
