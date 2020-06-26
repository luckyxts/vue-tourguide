import Vue from 'vue'
import App from './App.vue'
import tourguide from './../../dist/tourguide'

Vue.config.productionTip = false;

Vue.use(tourguide);

new Vue({
  render: h => h(App),
}).$mount('#app')
