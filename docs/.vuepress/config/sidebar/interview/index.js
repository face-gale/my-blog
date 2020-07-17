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
	'开篇',
	'未分类',
	'Java 基础',
	'Java 集合',
	'Java 线程',
	'Java 锁机制',
	'Spring',
	'分布式',
	'微服务',
	'数据存储',
	'缓存使用',
	'消息队列',
	'Netty',
	'安全篇',
	'性能篇',
	'设计模式',
	'需求分析',
	'设计能力',
	'面试题补充',
]
const childrenData = [
	['','Sentiment'],
	['knowledge0', 'knowledge1', 'knowledge2', 'knowledge3', 'knowledge4', 'knowledge5',],
	[
		'javabasics1',
		'javabasics2',
		'javabasics3',
		'javabasics4',
		'javabasics5',
		'javabasics6',
		'javabasics7',
		'javabasics8',
		'javabasics9',
		'javabasics10',
		'javabasics11',
		'javabasics12',
		'javabasics13',
	],
	[
		'Java-List1',
		'Java-List2',
		'Java-List3',
		'Java-List4',
		'Java-List5',
		'Java-List6',
		'Java-List7',
		'Java-List8',
		'Java-List9',
	],
	[
		'Java-Thread1',
		'Java-Thread2',
		'Java-Thread3',
		'Java-Thread4',
		'Java-Thread5',
		'Java-Thread6',
		'Java-Thread7',
		'Java-Thread8',
		'Java-Thread9',
		'Java-Thread10',
		'Java-Thread11',
	],
	[
		'Java-Locking1',
		'Java-Locking2',
		'Java-Locking3',
		'Java-Locking4',
		'Java-Locking5',
		'Java-Locking6',
		'Java-Locking7',
	],
	[
		'Java-Spring1',
		'Java-Spring2',
		'Java-Spring3',
		'Java-Spring4',
		'Java-Spring5',
		'Java-Spring6',
		'Java-Spring7',
		'Java-Spring8',
		'Java-Spring9',
		'Java-Spring10',
		'Java-Spring11',
	],
	[
		'Java-Distributed1',
		'Java-Distributed2',
		'Java-Distributed3',
		'Java-Distributed4',
		'Java-Distributed5',
	],
	[
		'Java-Service1',
		'Java-Service2',
		'Java-Service3',
		'Java-Service4',
		'Java-Service5',
		'Java-Service6',
		'Java-Service7',
		'Java-Service8',
		'Java-Service9',
		'Java-Service10',
		'Java-Service11',
		'Java-Service12',
		'Java-Service13',
		'Java-Service14',
	],
	[
		'Java-Mysql1',
		'Java-Mysql2',
		'Java-Mysql3',
		'Java-Mysql4',
		'Java-Mysql5',
		'Java-Mysql6',
		'Java-Mysql7',
		'Java-Mysql8',
		'Java-Mysql9',
		'Java-Mysql10',
		'Java-Mysql11',
		'Java-Mysql12',
		'Java-Mysql13',
		'Java-Mysql14',
		'Java-Mysql15',
	],
	[
		'Java-Redis1',
		'Java-Redis2',
		'Java-Redis3',
		'Java-Redis4',
		'Java-Redis5',
		'Java-Redis6',
		'Java-Redis7',
		'Java-Redis8',
		'Java-Redis9',
	],
	[
		'Java-MQ1',
		'Java-MQ2',
		'Java-MQ3',
		'Java-MQ4',
		'Java-MQ5',
		'Java-MQ6',
	],
	[
		'Java-Netty1',
		'Java-Netty2',
		'Java-Netty3',
		'Java-Netty4',
		'Java-Netty5',
		'Java-Netty6',
		'Java-Netty7',
		'Java-Netty8',
		'Java-Netty9',
	],
	[
		'Java-Security1',
		'Java-Security2',
		'Java-Security3',
		'Java-Security4',
		'Java-Security5',
		'Java-Security6',
		'Java-Security7',
	],
	[
		'Java-Performance1',
		'Java-Performance2',
		'Java-Performance3',
	],
	[
		'Java-Design-Model1',
		'Java-Design-Model2',
		'Java-Design-Model3',
		'Java-Design-Model4',
		'Java-Design-Model5',
		'Java-Design-Model6',
	],
	[
		'Java-AnalNeed1',
		'Java-AnalNeed2',
		'Java-AnalNeed3',
		'Java-AnalNeed4',
		'Java-AnalNeed5',
	],
	[
		'Java-Design-Ability1',
		'Java-Design-Ability2',
		'Java-Design-Ability3',
		'Java-Design-Ability4',
		'Java-Design-Ability5',
		'Java-Design-Ability6',
	],
	[
		'Java-Other-Case',
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
