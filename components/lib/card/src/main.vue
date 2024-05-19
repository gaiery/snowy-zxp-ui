<template>
  <div class="m-card" :style="width ? {width: width + 'px'} : {}">
    <div class="m-card-img" :style="imgHeight? {height:imgHeight+'px'}:{}">
        <img :src="imgSrc" alt="img" />
    </div>
    <div class="m-card-summary" v-if="summary">
      {{summary}}
    </div>
    <div v-else class="m-card-summary">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
    name:'m-card',
    props: {
      width: { //卡片宽度
        type:Number,
        default:0
      },
      imgSrc: { //卡片图片资源
        type:String,
        default:''
      },
      imgHeight: { //图片高度
        type:Number,
        default:0
      },
      summary: { //卡片概要
        type:String,
        default:''
      },
    }
}
</script>