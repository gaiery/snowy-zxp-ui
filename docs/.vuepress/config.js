// .vuepress/config.js
module.exports = {
    title:"Snowy-Zxp-UI",
    base:"/snowyzxpui/",
    themeConfig: {
      nav:[
        {
          text:'Home',link:'/'
        },{
          text:'Github',link:'https://github.com/gaiery/snowyzxpui/tree/master'
        },{
          text:'npm',link:'https://www.npmjs.com/package/snowy-zxp-ui'
        }
      ],
      sidebar: [
        '/',
        '/componentDocs/card',
        '/componentDocs/button',
        '/componentDocs/menu',
        '/componentDocs/air-control',
        '/componentDocs/angle',
        '/componentDocs/image-shot'
      ]
    },
    chainWebpack (config) {
      config.resolve.alias.set('core-js/library/fn', 'core-js/features');
    },
  }