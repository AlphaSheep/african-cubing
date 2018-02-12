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
      <!-- <h2>Upcoming Competitions</h2> -->
      <upcoming-competition-list/>
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
import UpcomingCompetitionList from '@/components/UpcomingCompetitionList';

export default {
  name: 'Main',
  components: {
    AfricaMap,
    UpcomingCompetitionList
  },
  data () {
    return {
      title: 'African Cubing Association',
      records: this.$axios.get('/static/records.json').then((response)=>{
        this.records = response.data;
        console.log(this.records);
      }),
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

</style>
