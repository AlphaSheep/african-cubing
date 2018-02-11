import axios from 'axios'
import moment from 'moment'

class CompetitionService {
  constructor() {
    this.competitions = [];
    axios.get('/static/competitions.json')
      .then((response) => {
        this.competitions = response.data;
      });
  }

  getUpcomingCompetitions(count) {
    let upcomingComps = this.competitions.filter(comp => comp.date > '2018-02-10');
    if (count) {
      return upcomingComps.slice(0,count);
    }
    else {
      return upcomingComps;
    }
  }

}

export default new CompetitionService();
