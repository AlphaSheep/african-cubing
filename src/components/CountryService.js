import axios from 'axios'

class CountryService {
  constructor() {
    this.countryNames = {};
    console.log('Empty country data initialised');
    axios.get('/static/countrynames.json')
      .then(response => {
        console.log('Country data loaded');
        this.countryNames = response.data;
      })
      .catch(response => {
        console.log('Country Service error');
        console.log(response);
      });

    this.hoverCountry = '';
    this.selectedCountry = '';
  }

  setHoverCountry(country) {
    this.hoverCountry = country;
  }

  setSelectedCountry(country) {
    this.selectedCountry = country;
  }
}

export default new CountryService();
