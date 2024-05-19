# Angle
角度旋转组件

### 示例
<m-angle />

### 代码
```html
<m-angle @angle="on_angle"></m-angle>
```

```js
<script>
export default {
    methods:{
        on_angle(angle){
            console.log(angle);    
        }
  }
}
</script>
```

#### 事件
| 事件名称 | 说明 | 参数 | 是否必要 | 默认值 |
| ---  | --- | ---  | --- | --- |
| @on_angle | 拖动旋转函数 | function(angle) angle即旋转角度值 | true | - |