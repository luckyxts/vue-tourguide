/**
 * Created by Administrator on 2020/6/21.
 */
import tourguide from './components/tourguide.vue'

const install = function(Vue){
    if (install.installed) return;
    Vue.component("tourguide", tourguide);
};
const API = {
    install,
};



export default API;
