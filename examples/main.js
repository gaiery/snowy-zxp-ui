import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


import '../components/css/card.scss'
import Card from  '../components/lib/card/index'
Vue.use(Card)

import '../components/css/button.scss'
import Button from  '../components/lib/button/index'
Vue.use(Button)

import '../components/css/tag.scss'
import Tag from  '../components/lib/tag/index'
Vue.use(Tag)

import '../components/css/menu.scss'
import Menu from  '../components/lib/menu/index'
Vue.use(Menu)

import AirControl from  '../components/lib/air-control/index'
Vue.use(AirControl)
import '../components/css/iconfont/iconfont.css' // iconfont矢量图

import '../components/css/angle.scss'
import Angle from  '../components/lib/angle/index'
Vue.use(Angle)

import ImageShot from  '../components/lib/image-shot/index'
Vue.use(ImageShot)

import VueCropper from 'vue-cropper'
Vue.use(VueCropper)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
