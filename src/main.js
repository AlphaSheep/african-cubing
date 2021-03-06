// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

import App from './App'
import router from './router'

import CompetitionService from './components/CompetitionService'
import CountryService from './components/CountryService'


Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;

Vue.prototype.CompetitionService = CompetitionService;
Vue.prototype.CountryService = CountryService;

fontawesome.library.add(solid);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
