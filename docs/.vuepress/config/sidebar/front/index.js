/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: penghe.yu
 * @Date: 2019-07-16 21:24:52
 * @LastEditors: penghe.yu
 * @LastEditTime: 2019-10-22 03:47:10
 */
const utils = require('../../utils/index')

const titles = [
    'HTML',
    'CSS',
    'Javascript',
]
const childrenData = [
    [
        ['', '概述'],
        ['html01', '标签学习'],
        ['html02', '旅游网站案例'],
        ['html03', '表单标签'],
    ],
    [
        ['css00', 'CSS(一)'],
        ['css01', 'CSS(二)'],
        ['css02', 'CSS(三)'],
        ['css03', 'CSS(四)'],
        ['css04', 'CSS(五)']
    ],
    [
        ['javascript00', '概述'],
        ['javascript01', 'ECMAScript(基本语法)'],
        ['javascript02', 'ECMAScript(基本对象)'],
        ['javascript03', 'DOM、事件 简单学习'],
        ['javascript04', 'BOM'],
        ['javascript05', 'DOM和事件监听机制'],
    ]
]

/**
 * 面试知识点模块
 * @param {*} params
 * @param {*} children
 */
function genSidebar(params, children) {
    return utils.genSidebar(params, children, false, 1)
}

module.exports = genSidebar(titles, childrenData)
