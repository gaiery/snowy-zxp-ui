# ImageShot
图片框选组件，
可对图片进行框选、预览、下载以及获取截图base64信息

### 示例
原图片，可框选区域
<m-image-shot :url="require('../../examples/assets/bg1.png')" :scale="50"></m-image-shot>

### 代码
```html
<m-image-shot :url="imageUrl" :scale="50" @getTargetBox="getTargetBox"></m-image-shot>
```
```js
export default {
    data () {
        return {
            imageUrl:require('../../examples/assets/bg1.png')
        }
    },
  methods:{
    getTargetBox(e){
      console.log(e)
    },
    targetImgUrl(e){
      console.log(e)
    },
  }
}
```

#### 属性
| 参数 | 说明 | 类型 | 是否必要 | 默认值 |
| ---  | --- | ---  | --- | --- |
| url | 原图片路径 | String | 是 | - |
| scale | 原图片缩放比例 | Number | 否 | 100，不设置默认为100% |

#### 事件
| 事件名称 | 说明 | 参数 | 是否必要 | 默认值 |
| ---  | --- | ---  | --- | --- |
| @getTargetBox | 获取框选区域信息 | function(info) info包含框选区域距离图片原点的x,y坐标、宽度、高度 | false | - |
| @targetImgUrl | 获取框选区域图片base64信息 | function(info) info为框选图片base64 | false | - |
