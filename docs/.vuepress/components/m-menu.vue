<template>
  <el-container style="height: 100%">
       <el-aside  :style="{width:(isCollapse ? '64px' : '240px')}">
           <el-menu v-bind="$attrs" class="el-menu-vertical-demo" :collapse="isCollapse">
                <div class="left-head" v-if="showHead">
                    <div class="logo">
                        <i class="el-icon-platform-eleme" style="font-size:30px"></i>
                    </div>
                    <div class="logo-title" v-if="!isCollapse">{{webTitle}}</div>
                </div>
                <div v-for="(item,index) in data" :key="index">
                    <div v-if="item.children.length===0">
                        <el-menu-item :index="item.link">
                            <i :class="'el-icon-'+item.icon"></i>
                            <span slot="title">{{item.text}}</span>
                        </el-menu-item>
                    </div>
                    <div v-else>
                        <el-submenu :index="item.link">
                            <template slot="title">
                                <i :class="'el-icon-'+item.icon"></i>
                                <span v-if="!isCollapse">{{item.text}}</span>
                            </template>
                            <el-menu-item-group title="">
                                <el-menu-item style="padding-left: 50px" v-for="(child,index_c) in item.children" :key="index_c" :index="child.link">{{child.text}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </div>
                </div>
            </el-menu>
       </el-aside>
       <el-container>
        <el-header>
            <div class="collapse-icon">
                <i class="el-icon-s-fold" v-if="!isCollapse" @click="isCollapse = !isCollapse"></i>
                <i class="el-icon-s-unfold" v-else @click="isCollapse = !isCollapse"></i>
            </div>
            <div class="header-center">
                <slot name="hcenter"></slot>
            </div>
            <div class="header-right">
                <i class="el-icon-s-custom"></i>
                <el-dropdown>
                    <span>王小虎</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-main>
            <slot></slot>
        </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
    name:'m-menu',
    data () {
        return {
            currentlink:'',
            isCollapse:false,
            breadList:[],
        }
    },
    props:{
        webTitle: { //标题
            type:String,
            default:'这是某某云平台'
        },
        logo: { //标题
            type:String,
            default:'images/logo.png'
        },
        data:{
            type:Array,
            default:function(){
                return [
                    {
                        text:'首页',
                        link:'/home',
                        id:0,
                        icon:'house',
                        children:[]
                        },
                        {
                        text:'统计',
                        link:'/gather',
                        id:0,
                        icon:'pie-chart',
                        children:[]
                        },
                        {
                            text: '任务管理',
                            link: '/task',
                            icon: 'setting',
                            id: 2,
                            children: [{
                            text: '用户管理',
                            link: '/task/user',
                            icon: 'power.png',
                            id: 3
                            }]
                        },{
                            text: '地图管理',
                            link: '/map',
                            icon: 'odometer',
                            id: 4,
                            children: [{
                            text: '轨迹管理',
                            link: '/map/guiji',
                            icon: 'power.png',
                            id: 5
                            }]
                        }
                ];
           }
        },
        showHead:{
            type:Boolean,
            default:true
        }
    },
    mounted () {
        // this.currentlink = location.hash.substring(1)
        this.getBreadCrumb()
    },
    methods:{
        getBreadCrumb(){
            // let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
            // this.breadList = matched
        },
        signOut(){

        }
    }
    
}
</script>

<style>
@import './styles/menu.scss';
</style>