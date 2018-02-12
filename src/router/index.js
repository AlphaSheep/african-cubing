import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import About from '@/components/About'
import Competitions from '@/components/Competitions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/competitions',
      name: 'Competitions',
      component: Competitions
    },
    {
      path: '/records',
      name: 'Records',
      component: About
    }
  ]
})
