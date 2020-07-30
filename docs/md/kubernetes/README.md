---
title: "Kubernetes 简介"
date: 2019年11月4日15:52:51
---
# Kubernetes 简介
## 概述
<div align="center">
<img src="http://ww1.sinaimg.cn/large/007Rnr4nly1g8m1zcmjx6j30ul0fpn02.jpg">
</div>

Kubernetes 是 Google 2014 年创建管理的，是 Google 10 多年大规模容器管理技术 Borg 的开源版本。

Kubernetes 是容器集群管理系统，是一个开源的平台，可以实现容器集群的自动化部署、自动扩缩容、维护等功能。使用 Kubernetes 我们可以：
- 快速部署应用
- 快速扩展应用
- 无缝对接新的应用功能
- 节省资源，优化硬件资源的使用

Kubernetes 的目标是促进完善组件和工具的生态系统，以减轻应用程序在公有云或私有云中运行的负担。

::: tip 特点
- 可移植： 支持公有云，私有云，混合云，多重云（多个公共云）
- 可扩展： 模块化，插件化，可挂载，可组合
- 自动化： 自动部署，自动重启，自动复制，自动伸缩/扩展
:::

## 从传统到容器化部署
<div align="center">
<img src="http://ww1.sinaimg.cn/large/007Rnr4nly1g8m216yp5oj30yf0pst9l.jpg">
</div>

### 传统的部署方式
传统的应用部署方式是通过插件或脚本来安装应用。这样做的缺点是应用的运行、配置、管理、所有生存周期将与当前操作系统绑定，这样做并不利于应用的升级更新/回滚等操作，当然也可以通过创建虚机的方式来实现某些功能，但是虚拟机非常重，并不利于可移植性。

### 容器化部署的优势
- 快速创建/部署应用： 与虚拟机相比，容器镜像的创建更加容易。
- 持续开发、集成和部署： 提供可靠且频繁的容器镜像构建/部署，并使用快速和简单的回滚(由于镜像不可变性)。
- 开发和运行相分离： 在 build 或者 release 阶段创建容器镜像，使得应用和基础设施解耦。
- 开发，测试和生产环境一致性： 在本地或外网（生产环境）运行的一致性。
- 云平台或其他操作系统： 可以在 Ubuntu、RHEL、CoreOS、on-prem、Google Container Engine 或其它任何环境中运行。
- 分布式，弹性，微服务化： 应用程序分为更小的、独立的部件，可以动态部署和管理。
- 资源隔离
- 资源利用更高效

## 为什么需要 Kubernetes
可以在物理或虚拟机的 Kubernetes 集群上运行容器化应用，Kubernetes 能提供一个以 “容器为中心的基础架构”，满足在生产环境中运行应用的一些常见需求，如：

- 多个进程协同工作
- 存储系统挂载
- 应用健康检查
- 应用实例的复制
- 自动伸缩/扩展
- 注册与发现
- 负载均衡
- 滚动更新
- 资源监控
- 日志访问
- 调试应用程序
- 提供认证和授权