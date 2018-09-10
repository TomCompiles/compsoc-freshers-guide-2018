<template>
<div id="timeline">
    <!-- <b-container fluid> -->

  <b-row no-gutters>

  <b-col class="col-sm-12 col-md-4 col-lg-12">
    <b-jumbotron class="h-100 noto" >
     <h1 class="display-4">Discover something new this freshers!</h1>
     <hr>
  <p>This site lists every event I could find during the freshers period, from every company and every venue.</p>
  
  <p>I hope it helps you find something new. If I missed anything, or you have any comments, get in touch!</p>
  
  <em>-Tom and the CompSoc Comitee </em>
  <br>
  <br>
  <!-- <button role="button" class="btn btn-outline-info" v-b-toggle="'info'" ><font-awesome-icon :icon="'fa-info'" /> Learn More</button>
  
  <b-collapse id="info">
    <br>
    <p>The idea behind this site was to help you find out about events you might not otherwise heard of.</p>
    <p>I made it over a week with a lot of blood sweat and tears</p>
    <p>I haven't been payed for any of it, and I intentionlly didn't put rep links in any of the ticket links, so i'm not making any money from it</p>
  </b-collapse> -->
  <hr>
  <div class="text-right">
    <p v-if="$mq === 'xs'">Swipe to find out what other events are available on a day</p>
  <p v-else>Use the navigations buttons, or drag</p>
  <p>Click an event to get more information.</p>
  </div>

  <!-- <b-btn variant="primary" href="#">More Info</b-btn> -->
</b-jumbotron>
  </b-col>

  <b-col class="col-sm-12 col-lg-12">
  <b-row v-for="(swiper,id) in swipers" :key="id" class="no-gutters" style="">
    <b-col class="col-xs-12 col-sm-12 col-md-2">
        <b-card no-body class="text-center h-100 d-flex">
          <div class="card-body align-items-center d-flex flex-column justify-content-center noto no-pointer">
            <p class="swiper_label_day">
              {{ swiper.day_label }}
            </p>
            <p class="swiper_label_month">
            {{ swiper.month_label }}
            </p>
          </div> 
           </b-card>
    </b-col>
    
    <div class="h-100 col-sm-12 col-md-10">
      <b-row no-gutters>
        <b-col cols="1" class="d-none d-md-block">
          <b-card no-body class="text-center h-100 d-flex card-body align-items-center d-flex justify-content-center">
            <div :id="swiper.options.navigation.prevElid" class="slider_select slider_select_prev" >
              <font-awesome-icon icon="angle-double-left" />
            </div> 
            </b-card>
       </b-col>
       
      <div class="col-xs-12 col-lg-10">
        <div id="event-container h-100">
        <swiper :ref="swiper.swipe_ref" :options="swiper.options" class="d-flex align-items-center">
          <swiper-slide v-for="(event,id) in swiper.events" :key="id"  @click.native="showEventDetailsModal(event)">
              <div class="card bg-dark text-white event-card n">
              <img class="card-img-top event-card-img" :src="event.image_url" alt="Card image">
              <div class="card-img-overlay d-flex align-items-end">
                <!-- <div v-if="event.band=='paper'" class="ribbon red"><span>Paper Band</span></div> -->
                <!-- <h5 class="card-title">{{event.name}}</h5> -->
                <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text">Last updated 3 mins ago</p> -->
              </div>
              <div class="card-body">
                <p class="card-text">{{event.name}}</p>
              </div>
            </div>
            </swiper-slide>
            <!-- Optional controls -->
            <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
            <!-- <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div> -->
            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper> 
        </div>

      </div>
        <b-col cols="1" class="d-none d-md-block">
          <b-card no-body class="text-center h-100 d-flex card-body align-items-center d-flex justify-content-center">
              <div :id="swiper.options.navigation.nextElid" class="slider_select slider_select_next" >
                <!-- @click="swipeNext(swiper.swipe_ref)" x -->
                <font-awesome-icon icon="angle-double-right" />
              </div> 
           </b-card>
         </b-col>
      </b-row>

      
    </div>
  
    
</b-row>
</b-col>
</b-row>



   <b-modal ref="event_details_modal" centered hide-footer title="Event Details">
      <div class="d-block text-center">
        <b-img fluid :src="selected_event.image_url"/>
        <hr>
        <h3>{{selected_event.name}}</h3>

         
         
        <!-- <a :href="selected_event.facebook_url"> -->
           <a :href="selected_event.facebook_url" role="button" class="btn btn-outline-info"><font-awesome-icon :icon="['fab', 'facebook-square']" /> Facebook Event</a>
         <!-- </a> -->
        <!-- <a :href="selected_event.ticket_url"> -->
          <a :href="selected_event.ticket_url" role="button" class="btn btn-outline-success"><font-awesome-icon icon="ticket-alt" /> Buy tickets</a>
        <!-- </a> -->
        <!-- <p>{{selected_event.ticket_url}}</p> -->
      </div>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideEventDetailsModal()">Close Me</b-btn>
    </b-modal>

    <!-- </b-container> -->
    </div>
</template>


<script>
import { Carousel, Slide } from "vue-carousel";
var events = require("@/data/events").events;

function createSwipers() {
  function FresherDay(day, month) {
    this.day = day;
    this.month = month;
    this.events = [];
  }
  const fresher_days = [];

  for (let index = 16; index < 30; index++) {
    fresher_days.push(new FresherDay(index, 9));
  }

  for (let index = 1; index < 17; index++) {
    fresher_days.push(new FresherDay(index, 10));
  }
  console.log(fresher_days);

  console.log(events);

  events.forEach(event => {
    event.image_url = require("@/assets/events/" +
      event.organiser.image_slug +
      "/event_" +
      event.id +
      ".jpg");
  });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
}

  function swiperOption(i) {
    var nextElid = "swiper-button-next-" + i.toString();
    var prevElid = "swiper-button-prev-" + i.toString();
    var options = {
      navigation: {
        nextEl: "#" + nextElid,
        prevEl: "#" + prevElid,
        nextElid: nextElid,
        prevElid: prevElid
      },
      effect: "slide",
      // loop : true,
      wrapperClass: "swiper-wrapper",
      cubeEffect: {
        slideShadows: false
      },
      coverflowEffect: {
        rotate: 30,
        slideShadows: false
      },
      slidesPerView: 3,
      slidesPerGroup: 1,
      loopFillGroupWithBlank: true,
      loopAdditionalSlides: 0,
      breakpoints: {
        // when window width is <= 320px
        376: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 10
        },
        // when window width is <= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // when window width is <= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 30
        }
      }
    };
    return options;
  }

  function getGetOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  var swipers = [];
  for (let i = 0; i < fresher_days.length; i++) {
    var fresher_day = fresher_days[i];

    var swiper_events = events.filter(
      event => event.day == fresher_day.day && event.month == fresher_day.month
    );

    shuffleArray(swiper_events);

    if (swiper_events.length == 0) continue;

    var swiper_information = {
      i: i.toString(),
      options: new swiperOption(i),
      events: swiper_events,
      day_label: getGetOrdinal(fresher_day.day),
      month_label: fresher_day.month == 9 ? "September" : "October",
      swipe_ref: i.toString() + "swiper"
    };
    swipers.push(swiper_information);
  }

  return swipers;
}

export default {
  created() {
    if (this.$mq == "xs") {
      this.$data.swipers.map(swiper => (swiper.options.effect = "coverflow"));
      // this.$data.swipers.map(swiper => (swiper.options.loop = true));
    }
  },
  data() {
    return {
      swipers: createSwipers(),
      selected_event: events[0]
    };
  },
  components: {
    Carousel,
    Slide
  },
  computed: {
    card() {
      return require("@/assets/logo.png");
    }
  },
  methods: {
    msg: msg => {
      alert(msg);
    },
    // I'm pretty sure theese don't actually work :o
    swipeNext(swipe_ref) {
      // let swiper_el = this.$refs.swipe_ref;
      let swiper_el = this.$refs[id.toString()];
      swiper_el.slideNext();
    },
    swipeBack(swiper, id) {
      let swiper_el = this.$refs[id.toString()];
      swiper_el.slidePrev();
    },
    showEventDetailsModal(event) {
      this.selected_event = event;
      this.$refs.event_details_modal.show();
    },
    hideEventDetailsModal() {
      this.$refs.event_details_modal.hide();
    }
  }
};
</script>





<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Serif+JP");

.noto {
  font-family: "Noto Serif JP", sans-serif;
}

.noto-heavy {
  font-weight: 700;
}

.swiper_label_day {
  font-size: 5vh;
  margin: 0px;
}

img {
  user-select: none;
}

.swiper-wrapper {
  display: -ms-flexbox !important;
  display: flex !important;
  -ms-flex-align: center !important;
  align-items: center !important;
}

.no-pointer {
  /* pointer-events: none; */
  user-select: none;
}

.slider_select {
  /* pointer-events: none; */
  user-select: none;
  font-size: 2em;
}

.swiper-button-enabled {
  font-size: 4vh;
}

.swiper-button-disabled {
  font-size: 2em;
  color: lightgrey;
}

.jumbotron {
  padding-top: 16px;
  padding-bottom: 8px;
}

.event-card {
  /* -webkit-text-stroke: 1px black; */
}

.event-card-img {
  /* opacity: 0.66; */
}

.ribbon {
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 1;
  overflow: hidden;
  width: 75px;
  height: 75px;
  text-align: right;
}
.ribbon span {
  font-size: 10px;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  line-height: 20px;
  transform: rotate(45deg);
  width: 100px;
  display: block;
  background: #79a70a;
  background: linear-gradient(#9bc90d 0%, #79a70a 100%);
  box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
  position: absolute;
  top: 19px;
  right: -21px;
}
.ribbon span::before {
  content: "";
  position: absolute;
  left: 0px;
  top: 100%;
  z-index: -1;
  border-left: 3px solid #79a70a;
  border-right: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79a70a;
}
.ribbon span::after {
  content: "";
  position: absolute;
  right: 0%;
  top: 100%;
  z-index: -1;
  border-right: 3px solid #79a70a;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-top: 3px solid #79a70a;
}
.red span {
  background: linear-gradient(#f70505 0%, #8f0808 100%);
}
.red span::before {
  border-left-color: #8f0808;
  border-top-color: #8f0808;
}
.red span::after {
  border-right-color: #8f0808;
  border-top-color: #8f0808;
}
</style>
