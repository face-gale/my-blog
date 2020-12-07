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
    '编程方法论',
]
const childrenData = [
    [
        ['01.禅道简介', '禅道简介'],
        ['02.安装禅道', '安装禅道'],
    ]
]

/**
 * 面试知识点模块
 * @param {*} params
 * @param {*} children
 */
function genSidebar(params, children) {
    return utils.genSidebar(params, children, false, 3)
}

module.exports = genSidebar(titles, childrenData)
