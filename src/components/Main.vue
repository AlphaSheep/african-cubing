<template>
  <div class="main">

    <!-- <div v-on:click="getRecordData()">
      Record data:
      {{recordData}}
    </div> -->

    <div class="map-container">
      <africa-map/>
    </div>

    <div class="competition-container">
      <div v-for="comp in competitions" class="competition-card">
        <h3>{{comp.name}}</h3>
        <div class="competition-card-content">

          {{comp.cityName}}, <strong>{{comp.country}}</strong><br/>
          {{comp.date}} <span v-if="comp.date !== comp.endDate">to {{comp.date}}</span><br/>

          <ul>
            <li v-for="winner in comp.winners">
              {{winner.pos}}. {{winner.personName}} ({{winner.average/100}})
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <div class="record-container">
      Records
      <div v-for="record in records">
        {{record}}
      </div>
    </div> -->

  </div>
</template>

<script>
import AfricaMap from '@/components/AfricaMap';


export default {
  name: 'Main',
  components: {
    AfricaMap
  },
  data () {
    return {
      title: 'African Cubing Association',
      records: this.$axios.get('/static/records.json').then((response)=>{
        this.records = response.data;
        console.log(this.records);
      }),
      CompetitionService: this.CompetitionService
    }
  },
  computed: {
    competitions: function () {
      return this.CompetitionService.getUpcomingCompetitions(3);
    }
  },
  methods: {
    getRecordData: function () {
      console.log(this.records);
      return this.records;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {
    margin-top: 80px;
  }

  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }

  .map-container {
    display: inline-flex;
    max-width: 50%;
    vertical-align: top;
  }

  .competition-container {
    display: inline-block;
    min-width: 320px;
    vertical-align: top;
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
  }
</style>
