(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{444:function(t,e,i){},464:function(t,e,i){"use strict";i(444)},478:function(t,e,i){"use strict";i.r(e);var l={name:"m-menu",data:()=>({currentlink:"",isCollapse:!1,breadList:[]}),props:{webTitle:{type:String,default:"这是某某云平台"},logo:{type:String,default:"images/logo.png"},data:{type:Array,default:function(){return[{text:"首页",link:"/home",id:0,icon:"house",children:[]},{text:"统计",link:"/gather",id:0,icon:"pie-chart",children:[]},{text:"任务管理",link:"/task",icon:"setting",id:2,children:[{text:"用户管理",link:"/task/user",icon:"power.png",id:3}]},{text:"地图管理",link:"/map",icon:"odometer",id:4,children:[{text:"轨迹管理",link:"/map/guiji",icon:"power.png",id:5}]}]}},showHead:{type:Boolean,default:!0}},mounted(){this.getBreadCrumb()},methods:{getBreadCrumb(){},signOut(){}}},s=(i(464),i(40)),n=Object(s.a)(l,(function(){var t=this,e=t._self._c;return e("el-container",{staticStyle:{height:"100%"}},[e("el-aside",{style:{width:t.isCollapse?"64px":"240px"}},[e("el-menu",t._b({staticClass:"el-menu-vertical-demo",attrs:{collapse:t.isCollapse}},"el-menu",t.$attrs,!1),[t.showHead?e("div",{staticClass:"left-head"},[e("div",{staticClass:"logo"},[e("i",{staticClass:"el-icon-platform-eleme",staticStyle:{"font-size":"30px"}})]),t._v(" "),t.isCollapse?t._e():e("div",{staticClass:"logo-title"},[t._v(t._s(t.webTitle))])]):t._e(),t._v(" "),t._l(t.data,(function(i,l){return e("div",{key:l},[0===i.children.length?e("div",[e("el-menu-item",{attrs:{index:i.link}},[e("i",{class:"el-icon-"+i.icon}),t._v(" "),e("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(i.text))])])],1):e("div",[e("el-submenu",{attrs:{index:i.link}},[e("template",{slot:"title"},[e("i",{class:"el-icon-"+i.icon}),t._v(" "),t.isCollapse?t._e():e("span",[t._v(t._s(i.text))])]),t._v(" "),e("el-menu-item-group",{attrs:{title:""}},t._l(i.children,(function(i,l){return e("el-menu-item",{key:l,staticStyle:{"padding-left":"50px"},attrs:{index:i.link}},[t._v(t._s(i.text))])})),1)],2)],1)])}))],2)],1),t._v(" "),e("el-container",[e("el-header",[e("div",{staticClass:"collapse-icon"},[t.isCollapse?e("i",{staticClass:"el-icon-s-unfold",on:{click:function(e){t.isCollapse=!t.isCollapse}}}):e("i",{staticClass:"el-icon-s-fold",on:{click:function(e){t.isCollapse=!t.isCollapse}}})]),t._v(" "),e("div",{staticClass:"header-center"},[t._t("hcenter")],2),t._v(" "),e("div",{staticClass:"header-right"},[e("i",{staticClass:"el-icon-s-custom"}),t._v(" "),e("el-dropdown",[e("span",[t._v("王小虎")]),t._v(" "),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",[t._v("修改密码")]),t._v(" "),e("el-dropdown-item",[t._v("退出系统")])],1)],1)],1)]),t._v(" "),e("el-main",[t._t("default")],2)],1)],1)}),[],!1,null,null,null);e.default=n.exports}}]);