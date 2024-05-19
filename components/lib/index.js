import Demo from './demo'
import Card from './card'
import Button from './button'
import Tag from './tag'
import Menu from './menu'
import AirControl from './air-control'
import ImageShot from './image-shot'

const components = {
    Demo,
    Card,
    Button,
    Tag,
    Menu,
    AirControl,
    ImageShot
}
const install = function (Vue) {
    if(install.installed) return;
    Object.keys(components).forEach(key => {
        Vue.component(components[key].name,components[key])
    })
}
const API = {
    install
}
export default API;