# 快速开始

#### 安装组件库

```bash
npm i snowy-zxp-ui -S
```

#### 使用组件库
> 在main.js中引用组件库
```javascript
//全部引入
import 'snowy-zxp-ui/dist/css/index.css';
import RUI from 'snowy-zxp-ui'
Vue.use(RUI)

//按需引入
import 'snowy-zxp-ui/dist/css/card.css'
import { Card } from 'snowy-zxp-ui'
Vue.use(Card)
```