<p>vue-tourGuide is a Vue plug-in for web Wizard.<p>

###### Demo
- <a href="https://luckyxts.github.io/vue-tourGuide/example/dist/" target="_blank">Demo</a>
<p>


#### 🚀 Installation
``` bash
npm install vue-tourGuide --save
```
##### Introducing plugins
``` javascript
import Vue from 'vue'
import App from './App.vue'
import vueTourGuide from 'vue-tourGuide'

Vue.use(vueTourGuide)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```
##### Using in .vue
```
<tourGuide :tourConfigList="tourConfigList" :show="show" @closeTour="closeTour"></tourGuide>
```
##### tourConfigList detail
```
this.tourConfigList.push( {
     displayPosition: "left-top",
     elements: [this.$refs.light],
     axisType: "x",
     desc: "this is a title",
     maxWidth: 200
})
```

**Parameters**|**Type's**|**Default**|**Required**|**Description**
-----|-----|-----|-----|-----
elements|dom|`null`|Required|Elements that need to be highlighted may need to be passed in the nexttick
displayPosition|String|`left-down`|Optional|describe the location of the text display
axisType|String|`y`|Optional|how to show the arrow
desc|String|`null`|Required|wizard text
maxWidth|String |`null`|Optional|the maximum length of the description text.if it exceeds the length,it willwrap

#####  event

**Parameters**|**Description**
-----|-----|-----|-----|-----
closeTour|close wizard callback

