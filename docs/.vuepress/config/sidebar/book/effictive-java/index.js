/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: penghe.yu
 * @Date: 2019-07-16 21:24:52
 * @LastEditors: penghe.yu
 * @LastEditTime: 2019-10-22 03:47:10
 */
const utils = require('../../../utils/index')

const titles = [
    'Effictive Java',
]
const childrenData = [
    [
        ['effictive-java/static-vs-construc', '静态工厂代替对象构造方法'],
    ],
]

function genSidebar(params, children) {
    return utils.genSidebar(params, children, false, 3)
}

module.exports = genSidebar(titles, childrenData)
