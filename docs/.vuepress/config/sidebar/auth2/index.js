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
    '创建案例工程',
    '创建认证服务器',
    '创建资源服务器',
]
const childrenData = [
    [
        ['1、简介', '简介'],
        ['2、为什么需要oAuth2', '为什么需要oAuth2'],
        ['3、开放平台', '开放平台'],
        ['4、令牌的访问与刷新', '令牌的访问与刷新'],
        ['5、客户端授权模式', '客户端授权模式'],
    ],
    [
        ['6、创建案例工程项目', '创建案例工程项目'],
        ['7、创建统一的依赖管理模块', '创建统一的依赖管理模块'],
        ['8、创建 oAuth2案例模块', '创建 oAuth2案例模块'],
    ],
    [
        ['9、创建认证服务器模块', '创建认证服务器模块'],
        ['10、基于内存存储令牌', '基于内存存储令牌'],
        ['11、基于JDBC存储令牌', '基于JDBC存储令牌'],
        ['12、RBAC基于角色的权限控制', 'RBAC基于角色的权限控制'],
        ['13、基于RBAC的自定义认证', '基于RBAC的自定义认证'],
        ['14、There is no PasswordEncodermapped', 'There is no PasswordEncodermapped'],
    ],
    [
        ['15、对认证服务器的修改', '对认证服务器的修改'],
        ['16、创建资源服务器模块', '创建资源服务器模块'],
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
