/**
 * Created by Administrator on 2020/6/21.
 */
import tourGuide from './components/tourGuide.vue'

const install = function(Vue){
    if (install.installed) return;
    Vue.component("tourGuide", tourGuide);
};
const API = {
    install,
};



export default API;
