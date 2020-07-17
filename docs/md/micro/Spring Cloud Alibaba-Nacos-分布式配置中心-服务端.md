# Nacos-分布式配置中心-服务端

## 分布式配置中心

在分布式系统中，由于服务数量巨多，为了方便服务配置文件统一管理，实时更新，所以需要分布式配置中心组件。

## Nacos Config

Nacos 提供用于存储配置和其他元数据的 key/value 存储，为分布式系统中的外部化配置提供服务器端和客户端支持。使用 Spring Cloud Alibaba Nacos Config，您可以在 Nacos Server 集中管理你 Spring Cloud 应用的外部属性配置。

Spring Cloud Alibaba Nacos Config 是 Spring Cloud Config Server 和 Client 的替代方案，客户端和服务器上的概念与 Spring Environment 和 PropertySource 有着一致的抽象，在特殊的 bootstrap 阶段，配置被加载到 Spring 环境中。当应用程序通过部署管道从开发到测试再到生产时，您可以管理这些环境之间的配置，并确保应用程序具有迁移时需要运行的所有内容。

## 创建配置文件

需要在 Nacos Server 中创建配置文件，我们依然采用 YAML 的方式部署配置文件，操作流程如下：

- 浏览器打开 http://localhost:8848/nacos ，访问 Nacos Server

![](/micro/Lusifer_20190111030328.png)

- 新建配置文件，此处我们以之前创建的 [**服务提供者**](https://www.funtl.com/zh/spring-cloud-alibaba/创建服务提供者.html#创建服务提供者) 项目为例

![](/micro/Lusifer_20190111030615.png)

![](/micro/Lusifer_20190111030851.png)

**注意：Data ID 的默认扩展名为 `.properties` ，希望使用 YAML 配置，此处必须指明是 `.yaml`**

- 发布成功后在 “配置列表” 一栏即可看到刚才创建的配置项

![](/micro/Lusifer_20190111031454.png)