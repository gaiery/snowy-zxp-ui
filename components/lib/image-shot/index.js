import ImageShot from './src/main.vue'
ImageShot.install = function(Vue) {
    Vue.component(ImageShot.name,ImageShot)
}
export default ImageShot