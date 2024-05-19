<template>
  <div 
        ref="setup_angle"
        class="setup_angle"
        @mousedown="mousedown = true"
        @mouseup="mousedown = false"
        @mousemove="on_mousemove"
        @mouseleave="mousedown=false">
        <div 
            class="container"
            :style="{
                transform:'rotate('+angle_data+'deg)',
            }">
            <div class="point"></div>
        </div>
        <div class="content">
            {{ angle_data+'°' }}
        </div>
    </div>
</template>

<script>
export default { 
    name: 'm_angle',
    data(){
        return{
            angle_data:0,
            mousedown:false, //鼠标是否按下
        };
    },
    methods:{
        calculate_degree(x, y, centerX, centerY) { //根据当前坐标和中心坐标计算角度
            const radians = Math.atan2(x - centerX, y - centerY);
            return (radians * (180 / Math.PI) * -1) + 180;
        },
        on_mousemove(event){ //鼠标移动事件(按下移动就算拖拽，在元素里移动才算，元素外移动监听)
            if(this.mousedown){ //表示是按下移动的
                const setup_angle = this.$refs.setup_angle;
                let centerX = -~(setup_angle.offsetHeight || setup_angle.height)/2;
                let centerY = -~(setup_angle.offsetWidth || setup_angle.width)/2;
                let angle = this.calculate_degree(event.offsetX,event.offsetY,centerX,centerY);
                this.angle_data = -~angle;
                this.$emit('angle',angle); //发送事件
            }
        },
    },
}
</script>

<style scoped lang="scss">
.setup_angle{
    width: 200px;
    height: 200px;
    border: 20px solid #4d77eb71;
    box-sizing: border-box;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    >.container{
        pointer-events: none;
        height: 205px;
        width: fit-content;
        padding: 5px 0;
        box-sizing: border-box;
        >.point{
            width: 15px;
            height: 15px;
            background-color: #1410dd;
            border-radius: 50px;
        }
    }
    >.content{
        position:absolute;
        font-size: 16px;
        color: #5b748e;
        font-weight: bold;
        pointer-events: none;
    }
}
</style>