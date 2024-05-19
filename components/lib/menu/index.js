import Menu from './src/main.vue'
Menu.install = function(Vue) {
    Vue.component(Menu.name,Menu)
}
export default Menu