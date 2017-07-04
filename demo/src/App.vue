<template>
  <div id="app">
    <p>JSON数据：</p>
        <code>
        {label:'无',value:0},
        {label:'一个月',value:1},
        {label:'三个月',value:3},
        {label:'半年',value:6},
        {label:'一年',value:12},
        {label:'两年',value:24},
        {label:'三年',value:36}
        </code>
    
    <v-free-slider slidername='demo' :data="data" :value.sync="value"></v-free-slider>
  </div>
</template>

<script>
import vFreeSlider from './components/vue-freeslider'

export default {
  data(){
    return {
      data:[
        {label:'无',value:0},
        {label:'一个月',value:1},
        {label:'三个月',value:3},
        {label:'半年',value:6},
        {label:'一年',value:12},
        {label:'两年',value:24},
        {label:'三年',value:36}
      ],
      value:1
    }
  },
  components: {
    vFreeSlider
  }
}
</script>