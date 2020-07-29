<template>
    <div class="tour" v-if="show">
        <div v-for="(tourConfig, index) in configList"
             :key="key(tourConfig.id, index)"
        >
            <img :src="require(`@/assets/${tourConfig.imgSrc}`)"
                 :class="tourConfig.rotateClass"
                 :width="imgWidth" :height="imgHeight"
                 :style="{left: tourConfig.imgX, top: tourConfig.imgY}"
            >
            <div v-if="tourConfig.leftType==='right'" class="desc"
                 :style="{maxWidth: tourConfig.descMaxWidth,
                 left: tourConfig.descX, top: tourConfig.descY}">
                <span class="sortNum" v-if="tourConfig.sortNum">{{tourConfig.sortNum}}</span>
                {{tourConfig.desc}}
            </div>
            <div v-else class="desc"
                 :style="{width: tourConfig.descMaxWidth,
                 right: tourConfig.descX, top: tourConfig.descY}">
                <span class="sortNum" v-if="tourConfig.sortNum">{{tourConfig.sortNum}}</span>
                {{tourConfig.desc}}
            </div>
        </div>
        <div class="closeTour" @click="closeTour" v-if="configList.length > 0">
            <img :src="require(`@/assets/close.png`)" class="confirmBtn">
        </div>
    </div>
</template>
<script>
    export default {
        name: `taskTour`,
        props: [`tourConfigList`, `show`],
        data() {
            return {
                configList: [],
                changeClassBak: [],
                imgWidth: 120,
                imgHeight: 120,
                // 旋转图片
                tourArrowX: `tourArrowX.png`,
                tourArrowY: `tourArrowY.png`,
                // closeImg,
                z: `1002`,
                // 竖向展示
                displayPosition: [`left-top`, `right-top`, `left-down`, `right-down`],
                descConfig: [],
                timer: null,
            };
        },
        methods: {
            initTaskTour(descConfig, resize) {
                if (!descConfig) {
                    return;
                }
                // 备份配置属性，以防屏幕缩放
                this.descConfig = descConfig;
                this.configList = [];
                descConfig.forEach((desc) => {
                    let {
                        displayPosition, elements, axisType, maxWidth,
                    } = desc;
                    axisType = axisType || `y`;
                    let [leftType, topType] = displayPosition.split(`-`);
                    elements.forEach((elem) => {
                        let displayType = getComputedStyle(elem).display;
                        if (!resize) {
                            this.generateElemClass(elem, displayType);
                        }
                    });
                    let {
                        descX, descY, imgX, imgY, rotateClass,
                    } = this.generatePosition(
                        elements[0], displayPosition, axisType, leftType, topType
                    );
                    this.configList.push({
                        descX: `${descX - scrollX}px`,
                        descY: `${descY - scrollY}px`,
                        desc: desc.desc,
                        imgX: `${imgX - scrollX}px`,
                        imgY: `${imgY - scrollY}px`,
                        sortNum: desc.sortNum,
                        descMaxWidth: (maxWidth ? `${maxWidth}px` : `auto`),
                        rotateClass,
                        leftType,
                        imgSrc: axisType === `y` ? this.tourArrowY : this.tourArrowX,
                    });

                });
                this.addBindEvent();
            },
            generatePosition(element, displayPosition, axisType, leftType, topType){
                if (!this.displayPosition.includes(displayPosition)) {
                    displayPosition = `left-down`;
                }
                axisType = axisType || `y`;
                let {clientHeight, clientWidth} = element;
                let {left, top, bottom} = element.getBoundingClientRect();
                // 在y轴的方向展示描述
                if (axisType === `y`) {
                    return this.generatePositionY(leftType,
                        topType,
                        left + pageXOffset, top + pageYOffset, bottom + pageYOffset,
                        clientWidth, clientHeight);
                }
                return this.generatePositionX(leftType,
                    topType,
                    left + pageXOffset, top + pageYOffset,
                    clientWidth, clientHeight);
            },

            generatePositionY(leftType, topType, left, top, bottom, width, height){
                let positionConfig = {};
                if (leftType === `right`) {
                    positionConfig.descX = left + 100 + Math.floor(width / 2);
                    positionConfig.imgX = left + Math.floor(width / 2);
                } else {
                    positionConfig.imgX = left - this.imgWidth + Math.floor(width / 2);
                    positionConfig.descX = document.body.clientWidth -  positionConfig.imgX;
                }
                if (topType === `down`) {
                    positionConfig.descY = top + this.imgHeight + height;
                    positionConfig.imgY = bottom;
                } else {
                    positionConfig.descY = top - this.imgHeight - 20;
                    positionConfig.imgY = top - this.imgHeight;
                }
                positionConfig.rotateClass = `y-${leftType}-${topType}`;
                return positionConfig;

            },
            generatePositionX(leftType, topType, left, top, width, height){
                let positionConfig = {};
                if (leftType === `right`) {
                    positionConfig.descX = left + this.imgWidth + width - 10;
                    positionConfig.imgX = left + width;
                } else {
                    positionConfig.imgX = left - this.imgWidth;
                    positionConfig.descX = document.body.clientWidth -  positionConfig.imgX;
                }
                if (topType === `down`) {
                    positionConfig.descY = top + this.imgHeight + Math.floor(height / 2);
                    positionConfig.imgY = top + Math.floor(height / 2);
                } else {
                    positionConfig.descY = top - this.imgHeight + Math.floor(height / 2) - 20;
                    positionConfig.imgY = top + Math.floor(height / 2) - this.imgHeight;
                }
                positionConfig.rotateClass = `x-${leftType}-${topType}`;
                return positionConfig;
            },
            closeTour(){
                // 还原属性
                this.removeElemClass();
                this.$emit(`closeTour`);
            },
            // 生成class
            generateElemClass(elem, displayType){
                let style = getComputedStyle(elem);
                this.changeClassBak.push({
                    elem,
                    style: {
                        display: style.display,
                        "z-index": style[`z-index`],
                        "background-color": style[`background-color`],
                        "pointer-events": style[`pointer-events`],
                    },
                });
                if (displayType === `inline`) {
                    elem.style.display = `inline-block`;
                }
                elem.style.position = `relative`;
                elem.style[`z-index`] = this.z;
                elem.style[`background-color`] = `#fff`;
                elem.style[`pointer-events`] = `none`;
            },
            removeElemClass(){
                this.changeClassBak.forEach((changeClass) => {
                    let {elem, style} = changeClass;
                    Object.keys(style).forEach((className) => {
                        elem.style[className] = style[className];
                    });
                });
            },
            resizeFn(){
                if (this.timer ){
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.timer = setTimeout(() => {
                    this.initTaskTour(this.descConfig, true);
                });
            },
            addBindEvent(){
                addEventListener(`resize`, this.resizeFn);
                addEventListener(`scroll`, this.resizeFn, true);
            },
            // 去除自定义绑定事件
            removeBindEvent(){
                removeEventListener(`resize`, this.resizeFn);
            },
        },
        destroyed(){
            this.removeElemClass();
            this.removeBindEvent();
        },
        watch: {
            tourConfigList(val){
                this.initTaskTour(val);
                this.resizeFn()
            },
            show(val){
                if(val){
                    this.initTaskTour(this.descConfig);
                    this.resizeFn();
                }
            }
        },
        computed: {
            key(){
                return (id, index) => {
                    if( id ){
                        return id;
                    }
                    return index;
                }
            }
        }
    };
</script>

<style scoped>
    .tour {
        position: fixed;
        overflow: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        background: rgba(0, 0, 0, .4);
    }
    .desc {
        background-color: #ffffff;
        position: absolute;
        padding: 5px 5px;
        border-radius: 5px;
        color: rgb(246, 122, 69);
        word-break: break-word;
    }
    .sortNum {
        display: inline-block;
        background: rgb(223, 240, 248);
        border-radius: 50%;
        height: 18px;
        width: 18px;
        text-align: center;
    }
    .x-right-down {
        transform: rotateX(180deg);
        position: absolute;
    }
    .x-right-top {
        position: absolute;
    }
    .x-left-down {
        transform: rotateZ(180deg);
        position: absolute;
    }
    .x-left-top {
        position: absolute;
        transform: rotateY(180deg);
    }
    .y-right-down {
        position: absolute;
    }
    .y-right-top {
        position: absolute;
        transform: rotateX(180deg);
    }
    .y-left-down {
        position: absolute;
        transform: rotateY(180deg);
    }
    .y-left-top {
        position: absolute;
        transform: rotateZ(180deg);
    }
    .closeTour {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }
    /*确定按钮样式*/
    .confirmBtn{
        width: 40px;
        height: 40px;
    }
</style>