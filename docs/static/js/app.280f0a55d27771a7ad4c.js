webpackJsonp([2,0],{0:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var i=a(35),l=s(i),u=a(33),n=s(u);new l.default({el:"body",components:{App:n.default}})},7:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(34),l=s(i);t.default={data:function(){return{data:[{label:"一个月",value:1},{label:"三个月",value:3},{label:"半年",value:6},{label:"一年",value:12},{label:"两年",value:24},{label:"三年",value:36}],value:1}},components:{vFreeSlider:l.default}}},8:function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(9),l=s(i);t.default={props:{value:{type:Number,twoWay:!0},slidername:{type:String},data:{type:Array,required:!0}},data:function(){return{active:!1,dragging:!1,xscale:null,labels:[],values:[],max:null}},ready:function(){var e=this;this.data.forEach(function(t){e.values.push(t.value),e.labels.push(t.label)}),this.max=Math.max.apply(null,this.values),this.xscale=this.value/this.max*100,document.addEventListener("mousemove",this.dragMove),document.addEventListener("touchmove",this.dragMove),document.addEventListener("mouseup",this.dragEnd),document.addEventListener("touchend",this.dragEnd)},computed:{thumbLeft:function(){return this.xscale>=100?"-12px":null},title:function(){var e=this,t=this.data.find(function(t){return t.value==e.value});return t.label}},methods:{focus:function(){this.active=!0},blur:function(){this.active=!1},sliderClick:function(e){var t=this.max/this.$els.slider.offsetWidth,a=this.$els.slider.offsetWidth,s=e.clientX-this.$els.slider.getBoundingClientRect().left;s>=a&&(s=a),s<=0&&(s=0);var i=s*t,l=Math.round(i);this.setValue(l)},dragStart:function(e){this.disabled||(e.preventDefault(),e.stopPropagation(),e=e.changedTouches?e.changedTouches[0]:e,this.dragging=!0,this.$el.focus(),this.start=this.$els.slider.getBoundingClientRect().left)},dragMove:function(e){if(this.dragging){e.preventDefault(),e.stopPropagation(),e=e.changedTouches?e.changedTouches[0]:e;var t=this.$els.slider.offsetWidth,a=e.pageX-this.start;a>=t&&(a=t),a<=0&&(a=0);var s=a/t*100;if(this.minval){var i=this.minval/this.max*100;s<i&&(s=i)}if(this.maxval){var l=this.maxval/this.max*100;s<l&&(s=l)}var u=Math.round(s/this.stepScale),n=u*this.step;this.setValue(n)}},dragEnd:function(e){this.dragging&&(this.dragging=!1,this.$dispatch("money_callback",this.slidername))},getItemScale:function(e){var t=e/this.max*100;return t<100?{left:t+"%"}:{right:100-t+"%"}},getItemTag:function(e){return e===this.data.length-1?{right:0}:null},getValue:function(e){if(e>this.max_show_value)this.value=this.step_data.length-1,this.value_transfer=this.max_show_value;else if(e<this.min_show_value)this.value=0,this.value_transfer=this.min_show_value;else{var t=this.step_data;if((0,l.default)(t,e)==-1){for(var a=0;a<t.length;a++)if(e>t[a]&&e<t[a+1]){e-t[a]>t[a+1]-e?(this.value=(0,l.default)(t,t[a+1]),this.value_transfer=t[a+1]):(this.value=(0,l.default)(t,t[a]),this.value_transfer=t[a]);break}}else this.value=(0,l.default)(t,e)}},setValue:function(e){for(var t=0,a=0;a<this.data.length;a++)if(e>=this.data[a].value&&e<this.data[a+1].value){t=e-this.data[a].value>=this.data[a+1].value-e?this.data[a+1].value:this.data[a].value;break}this.value=t,this.xscale=this.value/this.max*100}},beforeDestroy:function(){document.removeEventListener("mousemove",this.dragMove),document.removeEventListener("touchmove",this.dragMove),document.removeEventListener("mouseup",this.dragEnd),document.removeEventListener("touchend",this.dragEnd)}}},30:function(e,t){},31:function(e,t){e.exports=" <div id=app> <p>JSON数据：</p> <code> {label:'无',value:0}, {label:'一个月',value:1}, {label:'三个月',value:3}, {label:'半年',value:6}, {label:'一年',value:12}, {label:'两年',value:24}, {label:'三年',value:36} </code> <v-free-slider slidername=demo :data=data :value.sync=value></v-free-slider> </div> "},32:function(e,t){e.exports=' <div class=ui-slider :class="{\'dragging\': dragging, \'disabled\': disabled, \'active\': active, \'has-label\': hasLabel}" :tabindex="disabled ? null : 0" role=slider :aria-valuenow=value @focus=focus @blur=blur _v-082bdf04=""> <div class=ui-slider-content _v-082bdf04=""> <div class=ui-slider-wrapper v-el:slider="" @mousedown=sliderClick _v-082bdf04=""> <div class=ui-slider-track _v-082bdf04=""> <div class=ui-slider-track-fill :style="{ width: xscale + \'%\'}" _v-082bdf04=""></div> </div> <div class=ui-slider-thumb-container @touchstart=dragStart @mousedown=dragStart :style="{ left: xscale + \'%\', marginLeft: thumbLeft}" :title=title _v-082bdf04=""> <div class=ui-slider-thumb _v-082bdf04=""></div> </div> <div v-for="item in data" class=ui-slider-thumb-label :style=getItemScale(item.value) _v-082bdf04=""> {{item.label}} <span class=ui-slider-thumb-tag :style=getItemTag($index) _v-082bdf04=""></span> </div> </div> </div> </div> '},33:function(e,t,a){var s,i,l={};s=a(7),i=a(31),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var u="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(u.template=i),u.computed||(u.computed={}),Object.keys(l).forEach(function(e){var t=l[e];u.computed[e]=function(){return t}})},34:function(e,t,a){var s,i,l={};a(30),s=a(8),i=a(32),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var u="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(u.template=i),u.computed||(u.computed={}),Object.keys(l).forEach(function(e){var t=l[e];u.computed[e]=function(){return t}})}});
//# sourceMappingURL=app.280f0a55d27771a7ad4c.js.map