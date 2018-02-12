<template>
  <div class="upcoming-competition-list">

      <div v-for="comp in competitions" class="competition-card">
        <h3>{{comp.name}}</h3>
        <div class="competition-card-content">

          {{comp.cityName}}, <strong>{{comp.country}}</strong><br/>
          {{comp.date.format('ddd, D MMMM')}}
          <span v-if="comp.date !== comp.endDate">
            to {{comp.endDate.format('ddd, D MMMM')}}
          </span> {{comp.date.format('YYYY')}}<br/>

          <ul>
            <li v-for="winner in comp.winners">
              {{winner.pos}}. {{winner.personName}} ({{winner.average/100}})
            </li>
          </ul>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'UpcomingCompetitionList',
  data () {
    return {
      title: 'UpcomingCompetitionList',
      CompetitionService: this.CompetitionService
    }
  },
  computed: {
    competitions: function () {
      return this.CompetitionService.getUpcomingCompetitions(10);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  h1 {
    font-weight: normal;
  }

  .competition-card {
    border: 1px solid #284;
    border-radius: 5px;
    margin: 20px 0;
    width: 100%;
    /*padding: 10px;*/
  }
  .competition-card h3 {
    padding: 5px 10px 10px 10px;
    margin: 0;
    border-bottom: 1px solid #284;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #132;
    color: #aec;
    font-size: 1em;
  }

  .competition-card-content {
    padding: 10px;
    font-size: 90%;
    text-align: left;
    line-height: 1.6em;
  }
</style>
