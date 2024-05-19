import AirControl from './src/main.vue'
AirControl.install = function(Vue) {
    Vue.component(AirControl.name,AirControl)
}
export default AirControl