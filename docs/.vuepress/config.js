const plugins = require('./config/plugins/')
const navConf=require('./config/nav/');
const sidebar=require('./config/sidebar/');
module.exports = {
    title: "路口小风",
    description: '欢迎进来',
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico`}],
        ['meta', { name: 'referrer', content: 'no-referrer' }]
    ],
    // plugins,
    themeConfig: {
        nav: navConf,
        sidebar: sidebar
    }
}