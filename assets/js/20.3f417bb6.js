(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{440:function(e,t,s){},460:function(e,t,s){"use strict";s(440)},474:function(e,t,s){"use strict";s.r(t);var n={name:"m_angle",data:()=>({angle_data:0,mousedown:!1}),methods:{calculate_degree:(e,t,s,n)=>Math.atan2(e-s,t-n)*(180/Math.PI)*-1+180,on_mousemove(e){if(this.mousedown){const t=this.$refs.setup_angle;let s=-~(t.offsetHeight||t.height)/2,n=-~(t.offsetWidth||t.width)/2,a=this.calculate_degree(e.offsetX,e.offsetY,s,n);this.angle_data=-~a,this.$emit("angle",a)}}}},a=(s(460),s(40)),o=Object(a.a)(n,(function(){var e=this,t=e._self._c;return t("div",{ref:"setup_angle",staticClass:"setup_angle",on:{mousedown:function(t){e.mousedown=!0},mouseup:function(t){e.mousedown=!1},mousemove:e.on_mousemove,mouseleave:function(t){e.mousedown=!1}}},[t("div",{staticClass:"container",style:{transform:"rotate("+e.angle_data+"deg)"}},[t("div",{staticClass:"point"})]),e._v(" "),t("div",{staticClass:"content"},[e._v("\n          "+e._s(e.angle_data+"°")+"\n      ")])])}),[],!1,null,"58c77561",null);t.default=o.exports}}]);