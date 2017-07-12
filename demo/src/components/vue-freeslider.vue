<template>
    <div class="ui-slider" :class="{'dragging': dragging, 'disabled': disabled, 'active': active, 'has-label': hasLabel}" :tabindex="disabled ? null : 0" role="slider" :aria-valuenow="value" @focus="focus" @blur="blur">
        <div class="ui-slider-content">
            <div class="ui-slider-wrapper" v-el:slider @mousedown="sliderClick">
                <div class="ui-slider-track">
                    <div class="ui-slider-track-fill" :style="{ width: xscale + '%'}"></div>
                </div>
                <div class="ui-slider-thumb-container" @touchstart="dragStart" @mousedown="dragStart" :style="{ left: xscale + '%', marginLeft: thumbLeft}" :title="title">
                    <div class="ui-slider-thumb"></div>
                </div>
                <div v-for="item in data" class="ui-slider-thumb-label" :style="getItemScale(item.value)">
                    {{item.label}}
                    <span class="ui-slider-thumb-tag" :style="getItemTag($index)"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: { //绑定值 双向
            type: Number,
            twoWay: true
        },
        slidername: {
            type: String
        },
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            active: false,
            dragging: false,
            xscale: null,
            labels: [],
            values: [],
            max: null
        };
    },
    ready() {
        this.initComponent() 
        // Put the Listener
        document.addEventListener("mousemove", this.dragMove)
        document.addEventListener("touchmove", this.dragMove)
        document.addEventListener("mouseup", this.dragEnd)
        document.addEventListener("touchend", this.dragEnd)
    },
    watch:{
        data(val){
            this.initComponent()
        }
    },
    computed:{
        thumbLeft(){
            return this.xscale >= 100 ? '-12px' : null
        },
        title(){
            let v = this.data.find(item => item.value == this.value)
            if(v){
                return v.label
            }
        }
    },
    methods: {
        focus() {
            this.active = true
        },
        blur() {
            this.active = false
        },
        initComponent(){
            this.values = []
            this.labels = []
            this.data.forEach(item => {
                this.values.push(item.value)
                this.labels.push(item.label)
            })
            this.max = (Math.max.apply(null, this.values))
            this.xscale = this.value / this.max * 100 //初始化显示值
        },
        sliderClick(e) {
            let stepScale = this.max / this.$els.slider.offsetWidth; //步进比例 百分比
            let bodyWidth = this.$els.slider.offsetWidth //silder宽度
            let xMovement = e.clientX - this.$els.slider.getBoundingClientRect().left; //移动像素

            if (xMovement >= bodyWidth) {
                xMovement = bodyWidth
            }
            if (xMovement <= 0) {
                xMovement = 0
            }

            let xMoveScale = xMovement * stepScale

            let value = Math.round(xMoveScale)
            this.setValue(value)
        },
        dragStart(e) {
            if (this.disabled) {
                return;
            }
            e.preventDefault()
            e.stopPropagation()

            e = e.changedTouches ? e.changedTouches[0] : e
            this.dragging = true;
            this.$el.focus();
            this.start = this.$els.slider.getBoundingClientRect().left
        },
        dragMove(e) {
            if (this.dragging) {
                e.preventDefault()
                e.stopPropagation()

                e = e.changedTouches ? e.changedTouches[0] : e

                let bodyWidth = this.$els.slider.offsetWidth //silder宽度
                let xMovement = e.pageX - this.start //移动像素
                if (xMovement >= bodyWidth) {
                    xMovement = bodyWidth
                }
                if (xMovement <= 0) {
                    xMovement = 0
                }
                let xMoveScale = xMovement / bodyWidth * 100
                if (this.minval) {
                    let minScale = this.minval / this.max * 100
                    if (xMoveScale < minScale) {
                        xMoveScale = minScale
                    }
                }
                if (this.maxval) {
                    let maxScale = this.maxval / this.max * 100
                    if (xMoveScale < maxScale) {
                        xMoveScale = maxScale
                    }
                }
                let multiple = Math.round(xMoveScale / this.stepScale);
                let value = multiple * this.step
                this.setValue(value)
            }
        },
        dragEnd(e) {
            if (this.dragging) {
                this.dragging = false;
                this.$dispatch('money_callback', this.slidername)
            }
        },
        getItemScale(val) {
            let xc = val / this.max * 100
            return xc < 100 ? {
                left: xc + '%'
            } : {
                right: 100 - xc + '%'
            }
        },
        getItemTag(index) {
            return index === this.data.length - 1 ? {
                right: 0
            } : null
        },
        getValue(val) {
            if (val > this.max_show_value) {
                this.value = this.step_data.length - 1
                this.value_transfer = this.max_show_value
            } else if (val < this.min_show_value) {
                this.value = 0
                this.value_transfer = this.min_show_value
            } else {
                let arrayData = this.step_data
                if (Array.indexOf(arrayData, val) == -1) {
                    for (let i = 0; i < arrayData.length; i++) {
                        if (val > arrayData[i] && val < arrayData[i + 1]) {
                            if (val - arrayData[i] > arrayData[i + 1] - val) {
                                this.value = Array.indexOf(arrayData, arrayData[i + 1])
                                this.value_transfer = arrayData[i + 1]
                            } else {
                                this.value = Array.indexOf(arrayData, arrayData[i])
                                this.value_transfer = arrayData[i]
                            }
                            break;
                        }
                    }
                } else {
                    this.value = Array.indexOf(arrayData, val)
                }
            }
        },
        setValue(val) { //val 模糊值
            let sVal = 0;
            for (let i = 0; i < this.data.length; i++) {
                if (val >= this.data[i].value && val < this.data[i + 1].value) {
                    sVal = val - this.data[i].value >= this.data[i + 1].value - val ? this.data[i + 1].value : this.data[i].value
                    break
                }
            }
            this.value = sVal
            this.xscale = this.value / this.max * 100 //初始化显示值
        }
    },
    beforeDestroy() {
        // Remove the Listener
        document.removeEventListener("mousemove", this.dragMove)
        document.removeEventListener("touchmove", this.dragMove)
        document.removeEventListener("mouseup", this.dragEnd)
        document.removeEventListener("touchend", this.dragEnd)
    },
}
</script>
<style type="text/css" scoped>
.ui-slider {
    outline: none;
}

.ui-slider-content {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
}

.ui-slider-wrapper {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: flex-end;
    position: relative;
    width: 100%;
    height: 60px;
}

.ui-slider-track {
    width: 100%;
    position: relative;
    height: 20px;
    background-color: #CEE9FF;
}

.ui-slider-track-fill {
    position: absolute;
    top: 0;
    height: 20px;
    background-color: #7CC5FF;
}

.ui-slider-thumb-container {
    position: absolute;
    top: 35px;
    left: 0;
    width: 12px;
    margin-left: -3px;
    z-index: 1;
}

.ui-slider-thumb-label {
    position: absolute;
    top: 5px;
    font-size: 14px;
}

.ui-slider-thumb-tag {
    width: 3px;
    height: 5px;
    background-color: lightblue;
    position: absolute;
    top: 30px;
}

.ui-slider-thumb {
    width: 12px;
    height: 30px;
    background-color: #2196f3;
    transition: -webkit-transform .2s linear;
    transition: transform .2s linear;
    transition: transform .2s linear, -webkit-transform .2s linear;
    -webkit-transform: scale(1);
    transform: scale(1);
}
</style>
