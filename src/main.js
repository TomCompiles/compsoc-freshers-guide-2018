// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueCarousel from 'vue-carousel';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee,faArrowAltCircleRight, faArrowAltCircleLeft, faAngleDoubleRight, faAngleDoubleLeft ,faTicketAlt, faInfo} from '@fortawesome/free-solid-svg-icons'
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMq from 'vue-mq'


library.add(faCoffee)
library.add(faAngleDoubleRight)
library.add(faAngleDoubleLeft)
library.add(faFacebookSquare)
library.add(faInfo)

library.add(faTicketAlt)


Vue.component('font-awesome-icon', FontAwesomeIcon)



Vue.use(VueMq, {
  breakpoints : {
    xs : 576,
    sm : 540,
    md : 720,
    lg : 960,
    xl : Infinity 
  }
})


Vue.use(VueCarousel);
Vue.use(BootstrapVue)


import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
