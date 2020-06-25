import Vue from 'vue'
import App from './App.vue'
import tourGuide from './../../dist/tourGuide'

Vue.config.productionTip = false;

Vue.use(tourGuide);

new Vue({
  render: h => h(App),
}).$mount('#app')
