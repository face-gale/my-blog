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
    'Spring Security oAuth2',
    '创建项目工程',
    '创建认证服务器',
    '创建资源服务器',
]
const childrenData = [
    [
        ['01.简介', '简介'],
        ['02.开放平台', '开放平台'],
        ['03.令牌的访问与刷新', '令牌的访问与刷新'],
        ['04.客户端授权模式', '客户端授权模式'],
    ],
    [
        ['05.创建项目工程', '创建项目工程'],
    ],
    [
        ['06.创建认证服务器', '创建认证服务器'],
        ['07.基于内存存储令牌', '基于内存存储令牌'],
        ['08.基于JDBC存储令牌', '基于JDBC存储令牌'],
        ['09.RBAC基于角色的访问控制', 'RBAC基于角色的访问控制'],
        ['10.基于RBAC的自定义认证', '基于RBAC的自定义认证'],
        // ['11.There is no PasswordEncodermapped', 'There is no PasswordEncodermapped'],
    ],
    [
        // ['12.对认证服务器的修改', '对认证服务器的修改'],
        ['13.创建资源服务器', '创建资源服务器'],
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
