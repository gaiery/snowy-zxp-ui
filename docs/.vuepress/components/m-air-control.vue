<template>
  <div style="width:300px">
      <div class="content">
        <div id="airPanel">
            <div @mousedown="mousedownPtz('8')" @mouseup="mouseupPtz('8')" v-bind:title="'左上'" class="iconfont">
                <span class="span1">&#xe635;</span>
            </div>
            <div @mousedown="mousedownPtz('1')" @mouseup="mouseupPtz('1')" v-bind:title="'上'" class="iconfont">
                <span class="span2">&#xe63c;</span>
            </div>
            <div @mousedown="mousedownPtz('2')" @mouseup="mouseupPtz('2')" v-bind:title="'右上'" class="iconfont"  >
                <span class="span3">&#xe62f;</span>
            </div>
            <div @mousedown="mousedownPtz('7')" @mouseup="mouseupPtz('7')" v-bind:title="'左'" class="iconfont">
                <span class="span4">&#xe637;</span>
            </div>
            <div class="center">
                <!-- <img src="../../assets/img/ic_control_refresh@2x.png" alt="" width="16.5" height="16.5" /> -->
            </div>
            <div @mousedown="mousedownPtz('3')" @mouseup="mouseupPtz('3')" v-bind:title="'右'" class="iconfont">
                <span class="span6">&#xe63e;</span>
            </div>
            <div @mousedown="mousedownPtz('6')" @mouseup="mouseupPtz('6')" v-bind:title="'左下'" class="iconfont" >
                <span class="span7">&#xe633;</span>
            </div>
            <div @mousedown="mousedownPtz('5')" @mouseup="mouseupPtz('5')" v-bind:title="'下'" class="iconfont" >
                <span class="span8">&#xe636;</span>
            </div>
            <div @mousedown="mousedownPtz('4')" @mouseup="mouseupPtz('4')" v-bind:title="'右下'" class="iconfont" >
            <span class="span9">&#xe630;</span>
            </div>
        </div>
        <div class="zoom">
            <div class="iconfont" @mousedown="mousedownZoom('1')" @mouseup="mouseupZoom('1')" v-bind:title="'变倍+'" style="font-size:22px"><span class="add-icon"></span></div>
            <div class="iconfont" @mousedown="mousedownZoom('2')" @mouseup="mouseupZoom('2')" v-bind:title="'变倍-'" style="font-size:22px"><span class="decrease-icon"></span></div>
        </div>
    </div>
    <div class="slider">
        <el-row :gutter="20">
            <el-col :span="4"><span>速度</span></el-col>
            <el-col :span="20"><el-slider v-model="step" :min="stepMin" :max="stepMax"></el-slider></el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {
    name:'m-air-control',
    data () {
        return {
            step:0
        }
    },
    props:{
        stepDefault: { 
            type:Number,
            default:0
        },
        stepMin:{
            type:Number,
            default:0
        },
        stepMax:{
            type:Number,
            default:0
        }
    },
    mounted(){
        this.setDefaultStep()
    },
    methods: {
        setDefaultStep(){
            this.step = this.stepDefault
        },
        // 按下调整的方向
        mousedownPtz (direction) {
            this.$emit('mousedownPtz',direction,this.step)
        },
        // 抬起
        mouseupPtz (direction) {
           this.$emit('mouseupPtz',direction,this.step)
        },

        mouseupZoom(zoom){
            this.$emit('mouseupZoom',zoom,this.step)
        },
        mousedownZoom(zoom){
            this.$emit('mousedownZoom',zoom,this.step)
        }

    }
}
</script>
<style lang="scss">
    #airPanel{
    width: 275px;
    height: 275px;
    border-radius: 50%;
    display: grid;
    grid-template-areas:
        "a b c"
        "d e f"
        "g h i";
    background: url('../../../src/images/ic_control@2x.png') no-repeat;
    background-size: 100% 100%;
    grid-template-columns: 92px 91px 91px;
    grid-template-rows: 91px 91px 91px;
}
#airPanel div {
    cursor: pointer;
    color: #B1D0FF;
    font-size: 16px;
    position: relative;
}
#airPanel div:hover {
    color: #0066FF;
}
#airPanel div:active {
    font-size: 16px;
}

#airPanel div .span1 {position: absolute; top: 66px; left: 66px;}
#airPanel div .span2 {position: absolute; top: 38px; left: 39px;}
#airPanel div .span3 {position: absolute; top: 66px; left: 11px;}
#airPanel div .span4 {position: absolute; top: 39px; left: 37px;}
#airPanel div.center {text-align: center; line-height: 100px;}
#airPanel div .span6 {position: absolute; top: 38px; left: 40px;}
#airPanel div .span7 {position: absolute; top: 11px; left: 65px;}
#airPanel div .span8 {position: absolute; top: 40px; left: 38px;}
#airPanel div .span9 {position: absolute; top: 11px; left: 10px;}
.add-icon, .decrease-icon {
    width: 64px;
    height: 64px;
    display: inline-block;
    background: url('../../../src/images/ic_add@2x.png') no-repeat;
    background-size: contain;
    cursor: pointer;
}
.add-icon:hover{
    background: url('../../../src/images/ic_add_selected@2x.png') no-repeat;
    background-size: contain;
}
.decrease-icon{
    background: url('../../../src/images/ic_subtract@2x.png') no-repeat;
    margin-top: 4px;
    background-size: contain;
}
.decrease-icon:hover{
    background: url('../../../src/images/ic_subtract_selected@2x.png') no-repeat;
    background-size: contain;
}
.content{
    display: flex;
}
.zoom{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>