# AirControl
云台组件

### 示例
<m-air-control
    :stepDefault="4"
    :stepMax="10"
   ></m-air-control>

### 代码
```html
<m-air-control
    :stepDefault="4"
    :stepMax="10"
    @mouseupPtz="mouseupPtz"
    @mousedownPtz="mousedownPtz"
    @mousedownZoom="mousedownZoom"
    @mouseupZoom="mouseupZoom"></m-air-control>
```
```js
export default {
  methods: {
    mouseupPtz (direction, step) {
      console.log(direction)
      console.log(step)
    },
    mousedownPtz (direction, step) {
      console.log(direction)
      console.log(step)
    },
    mousedownZoom (zoom) {
      console.log(zoom)
    },
    mouseupZoom (zoom) {
      console.log(zoom)
    },
    on_angle (angle) {
      console.log(angle)
    }
  }
}
```

#### 属性
| 参数 | 说明 | 类型 | 是否必要 | 默认值 |
| ---  | --- | ---  | --- | --- |
| stepDefault | 默认速度 | Number | 是 | 4 |
| stepMax | 速度最大值 | Number | 是 | 8 |

#### 事件
| 事件名称 | 说明 | 参数 | 是否必要 | 默认值 |
| ---  | --- | ---  | --- | --- |
| @mouseupPtz | 云台8个方向按钮按下，参数为方向值和速度的step值 | function(direction, step) direction:1上，2右上，3右，4右下，5下，6左下，7左，8左上 | true | - |
| @mousedownPtz | 云台8个方向按钮按下，参数为方向值和速度的step值 | function(direction, step) direction:1上，2右上，3右，4右下，5下，6左下，7左，8左上 | true | - |
| @mousedownZoom | 变倍按钮按下| function(str) 1代表变倍+按钮，2代表变倍-按钮 | true | - |
| @mouseupZoom | 变倍按钮抬起 | function(str) 1代表变倍+按钮，2代表变倍-按钮 | true | - |