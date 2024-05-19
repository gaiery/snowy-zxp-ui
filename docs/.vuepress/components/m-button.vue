<template>
  <button :class="'m-button m-button-'+type">按钮</button>
</template>

<script>
export default {
    name:'m-button',
    props:{
        type: { //卡片宽度
            type:String,
            default:''
        },
    }
}
</script>

<style lang="scss">
    @import './styles/button.scss';
</style>