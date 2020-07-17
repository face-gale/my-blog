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
	'Spring Cloud Alibaba'
]
const childrenData = [
	[
		'',
		'Spring Cloud Alibaba-简介',
		'Spring Cloud Alibaba-创建统一的依赖管理',
		'Spring Cloud Alibaba-Nacos-服务注册与发现',
		'Spring Cloud Alibaba-Nacos-服务提供者',
		'Spring Cloud Alibaba-Nacos-服务消费者(LoadBalance)',
		'Spring Cloud Alibaba-Nacos-服务消费者(Feign)',
		'Spring Cloud Alibaba-Sentinel-熔断器防止服务雪崩',
		'Spring Cloud Alibaba-Sentinel-熔断器仪表盘',
		'Spring Cloud Alibaba-Spring Cloud Gateway-API 网关',
		'Spring Cloud Alibaba-Spring Cloud Gateway-全局过滤器',
		'Spring Cloud Alibaba-Nacos-分布式配置中心-服务端',
		'Spring Cloud Alibaba-Nacos-分布式配置中心-客户端',
		'Spring Cloud Alibaba-Nacos-分布式配置中心-多环境配置',
		'Spring Cloud Alibaba-SkyWalking-分布式链路追踪',
		'Spring Cloud Alibaba-SkyWalking-服务端配置',
		'Spring Cloud Alibaba-SkyWalking-客户端配置',
		'Spring Cloud Alibaba-SkyWalking-Assembly 打包',
		'Spring Cloud Alibaba-RocketMQ-基于 Docker 安装',
		'Spring Cloud Alibaba-RocketMQ-生产者',
		'Spring Cloud Alibaba-RocketMQ-消费者'
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
