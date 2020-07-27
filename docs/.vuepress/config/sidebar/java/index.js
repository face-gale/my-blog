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
    'Java 快速入门',
    'Java面向对象编程',
    'Java异常处理',
    'Java注解',
    'Java泛型',
    'Java正则表达式',
    '函数式编程',
    'Java 接口',
    'Java 内部类',
    'Java Scanner 类',
    'Java IO',
    'Java 网络编程',
    'Java 反射',
    'Java 多线程',
]
const childrenData = [
    [
        ['java00/', 'Java 概述'],
        ['java00/java01', 'Java 对象和类'],
        ['java00/java16', 'Java 方法'],
        ['java00/java26', 'Java 包(package)'],
        ['java00/java03', 'Java 基本数据类型'],
        ['java00/data', 'Java 数据结构'],
        ['java00/java04', 'Java 变量类型'],
        ['java00/java05', 'Java 修饰符'],
        ['java00/java06', 'Java 运算符'],
        ['java00/java07', 'Java 循环结构'],
        ['java00/java08', 'Java 分支结构'],
        ['java00/java13', 'Java 数组'],
        ['java00/iterator', 'Java Iterator迭代器'],
    ],
    [
        ['java01/', '继承'],
        ['java01/java01', '多态'],
        ['java01/java01', '封装'],
    ],
    [
        ['java02/', 'Java 异常处理'],
    ],
    [
        ['java03/', 'Java 注解'],
    ],
    [
        ['java04/', 'Java 泛型'],
    ],
    [
        ['java05/', 'Java 正则表达式'],
    ],
    [
        ['java06/', 'Lambda表达式'],
        ['java06/java01', 'Stream流'],
        ['java06/java02', '常用方法及操作'],
        ['java06/java03', 'Stream流方法引用'],
        ['java06/java04', '函数式接口'],
        ['java06/java05', '函数式编程'],
        ['java06/java06', '常用的函数式接口'],
    ],
    [
        ['java07/', 'Java 接口'],
    ],
    [
        ['java08/', 'Java 内部类'],
    ],
    [
        ['java09/', 'Java Scanner 类'],
    ],
    [
        ['javaio/', 'IO概述'],
        ['javaio/javaio01', 'Java File类'],
        ['javaio/javaio02', 'Java 递归'],
        ['javaio/javaio03', '字节流'],
        ['javaio/javaio04', '字符流'],
        ['javaio/javaio05', '缓冲流'],
        ['javaio/javaio06', '转换流'],
        ['javaio/javaio07', '序列化'],
        ['javaio/javaio08', '打印流'],
    ],
    [
        ['javaosi/', '网络编程入门'],
        ['javaosi/javaosi01', 'TCP通信程序'],
        ['javaosi/javaosi02', '文件上传案例'],
        ['javaosi/javaosi03', '文件上传优化'],
    ],
    [
        ['javareflect/', '概述'],
        ['javareflect/javareflect01', 'Class对象功能'],
        ['javareflect/javareflect02', '框架案例'],
    ],
    [
        ['javathread/', '线程概述'],
        ['javathread/javathread01', '创建线程类'],
        ['javathread/javathread02', '线程相关概念'],
        ['javathread/javathread03', '线程池'],
    ],
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
