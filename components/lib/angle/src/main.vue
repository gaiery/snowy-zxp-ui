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
    name: 'm-angle',
    data(){
        return{
            angle_data:0,
            mousedown:false, //鼠标是否按下
        };
    },
    methods:{
        calculate_degree(x, y, centerX, centerY) { //根据当前坐标和中心坐标计算角度
        console.log(x,y, centerX, centerY)
            const radians = Math.atan2(x - centerX, y - centerY);
            return (radians * (180 / Math.PI) * -1) + 180;
        },
        // angleClick(event){
        //     console.log(event)
        //     const setup_angle = this.$refs.setup_angle;
        //     let centerX = -~(setup_angle.offsetHeight || setup_angle.height)/2;
        //     let centerY = -~(setup_angle.offsetWidth || setup_angle.width)/2;
        //     let angle = this.calculate_degree(event.offsetX,event.offsetY,centerX,centerY);
        //     this.angle_data = -~angle;
        //     this.$emit('angle',angle); //发送事件
        // },
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

<style>

</style>