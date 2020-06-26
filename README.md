<p>vue-tourguide is a Vue plugin for web wizard.<p>

###### Demo
- <a href="https://luckyxts.github.io/vue-tourguide/example/dist/" target="_blank">Demo</a>
<p>


#### 🚀 Installation
``` bash
npm install vue-tourguide --save
```
##### Introducing plugins
``` javascript
import Vue from 'vue'
import App from './App.vue'
import vueTourguide from 'vue-tourguide'

Vue.use(vueTourguide)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```
##### Using in .vue
```
<tourguide :tourConfigList="tourConfigList" :show="show" @closeTour="closeTour"></tourguide>
```
##### tourConfigList detail
```
this.tourConfigList.push( {
     displayPosition: "left-top",
     elements: [this.$refs.light],
     axisType: "x",
     desc: "this is a title",
     maxWidth: 200，
     id: "this is a title"
})
```

**Parameters**|**Type's**|**Default**|**Required**|**Description**
-----|-----|-----|-----|-----
elements|dom|`null`|Required|Elements that need to be highlighted may need to be passed in the nextTick
displayPosition|String|`left-down`|Optional|describe the location of the text display
axisType|String|`y`|Optional|how to show the arrow
desc|String|`null`|Required|wizard text
maxWidth|String |`null`|Optional|the maximum length of the description text.if it exceeds the length,it willwrap
id|String |`null`|Optional|used to bind key values to reduce repeated rendering

#####  event

**Parameters**|**Description**
-----|-----
closeTour|close wizard callback

