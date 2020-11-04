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
    '随笔',
]
const childrenData = [
    [
        ['2020-10-28','2020-10-28'],
        ['2020-07-09','2020-07-09'],
        ['2020-07-08','2020-07-08'],
        ['2020-07-07','2020-07-07'],
        ['2020-07-06','2020-07-06'],
        ['2020-07-02','2020-07-02'],
        ['2020-06-23','2020-06-23'],
    ],
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
