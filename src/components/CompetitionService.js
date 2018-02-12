import axios from 'axios'
import moment from 'moment'

class CompetitionService {
  constructor() {
    this.competitions = [];
    axios.get('/static/competitions.json')
      .then((response) => {
        this.competitions = response.data;
        this.cleanDates();
      });
  }

  getUpcomingCompetitions(count) {
    let today = moment();
    let upcomingComps = this.competitions.filter(comp => comp.endDate.isAfter(today));
    if (count) {
      return upcomingComps.slice(0,count);
    }
    else {
      return upcomingComps;
    }
  }

  getRecentCompetitions(count) {
    let today = moment();
    let upcomingComps = this.competitions.filter(comp => !comp.endDate.isAfter(today));
    if (count) {
      return upcomingComps.slice(0,count);
    }
    else {
      return upcomingComps;
    }
  }

  cleanDates() {
    console.log('Starting date clean');
    for (let iComp = 0; iComp < this.competitions.length; iComp++) {
      this.competitions[iComp].date = moment(this.competitions[iComp].date, "YYYY-MM-DD");
      this.competitions[iComp].endDate = moment(this.competitions[iComp].endDate, "YYYY-MM-DD");
    }
    console.log('Finished date clean');
    console.log(this.competitions);
  }
}

export default new CompetitionService();
