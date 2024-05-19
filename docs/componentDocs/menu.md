# menu
导航菜单

### 示例

<m-menu :isCollapse="true"><div>这里是主体内容</div></m-menu>

### 代码
```html
<m-menu :data = "data">
    <div>这里是主体内容</div>
</m-menu>
```

```js
<script>
export default {
  name: 'xxx',
  data(){
    return{
      menus:[
        {
          text:'首页',
          link:'/home',
          id:0,
          icon:'house',
          children:[]
        },
        {
            text: '任务管理',
            link: '/task',
            icon: 'setting',
            id: 2,
            children: [{
              text: '用户管理',
              link: '/task/user',
              icon: 'power.png',
              id: 3
            }]
          }
      ]
    }
  }
}
</script>
```

#### Attributes


| 参数 | 说明 | 类型 | 是否必要 | 默认值 |
| ---  | --- | ---  | --- | --- |
| data | 菜单数组 | Array | true | - |
| webTitle | 系统名称 | String | true | '这是某某云平台' |
| showHead | 是否显示顶部logo行 | Boolean | false | true |
该组件是基于elementUI进行的二次封装，各个参数可参考elementUI的NavMenu参数，均可使用。