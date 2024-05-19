<template>
    <el-tag
        class="m-tag" :class="{'no-border':!border}"
        closable
        :type="type">
        {{text}}
    </el-tag>
</template>

<script>
export default {
    name:'m-tag',
    props:{
        border: { //是否有边框
            type:Boolean,
            default:true
        },
        text: {
            type:String,
            default:'标签'
        },
        type:{
            type:String,
            default:'success'
        }
    }
}
</script>

<style>

</style>