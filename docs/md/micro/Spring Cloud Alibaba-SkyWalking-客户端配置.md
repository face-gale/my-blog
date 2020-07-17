# SkyWalking-客户端配置

## Java Agent 服务器探针

参考官网给出的帮助 [Setup java agent](https://github.com/apache/incubator-skywalking/blob/master/docs/en/setup/service-agent/java-agent/README.md)，我们需要使用官方提供的探针为我们达到监控的目的，按照实际情况我们需要实现三种部署方式

- IDEA 部署探针
- Java 启动方式部署探针（我们是 Spring Boot 应用程序，需要使用 `java -jar` 的方式启动应用）
- Docker 启动方式部署探针（需要做到一次构建到处运行的持续集成效果，本章节暂不提供解决方案，到后面的实战环节再实现）

探针文件在 `apache-skywalking-apm-incubating/agent` 目录下

![](/micro/Lusifer_20190114033410.png)

## IDEA 部署探针

继续之前的案例项目，创建一个名为 `hello-spring-cloud-external-skywalking` 的目录，并将 `agent` 整个目录拷贝进来

![](/micro/Lusifer_20190114034146.png)

修改项目的 VM 运行参数，点击菜单栏中的 `Run` -> `EditConfigurations...`，此处我们以 `nacos-provider` 项目为例，修改参数如下

```bash
-javaagent:D:\Workspace\Others\hello-spring-cloud-alibaba\hello-spring-cloud-external-skywalking\agent\skywalking-agent.jar
-Dskywalking.agent.service_name=nacos-provider
-Dskywalking.collector.backend_service=localhost:11800
```

![](/micro/Lusifer_20190114034730.png)

- `-javaagent`：用于指定探针路径
- `-Dskywalking.agent.service_name`：用于重写 `agent/config/agent.config` 配置文件中的服务名
- `-Dskywalking.collector.backend_service`：用于重写 `agent/config/agent.config` 配置文件中的服务地址

## Java 启动方式

```bash
java -javaagent:/path/to/skywalking-agent/skywalking-agent.jar -Dskywalking.agent.service_name=nacos-provider -Dskywalking.collector.backend_service=localhost:11800 -jar yourApp.jar
```

## 测试监控

启动 `nacos-provider` 项目，通过观察日志可以发现，已经成功加载探针

![](/micro/Lusifer_20190114035643.png)

访问之前写好的接口 http://localhost:8081/echo/hi 之后再刷新 SkyWalking Web UI，你会发现 Service 与 Endpoint 已经成功检测到了

![](/micro/Lusifer_20190114035917.png)

![](/micro/Lusifer_20190114040024.png)

至此，表示 SkyWalking 链路追踪配置成功

## SkyWalking Trace 监控

SkyWalking 通过业务调用监控进行依赖分析，提供给我们了服务之间的服务调用拓扑关系、以及针对每个 Endpoint 的 Trace 记录。

### 调用链路监控

点击 `Trace` 菜单，进入追踪页

![](/micro/Lusifer_20190114040606.png)

点击 `Trace ID` 展开详细信息

![](/micro/Lusifer_20190114040953.png)

![](/micro/Lusifer_20190114041036.png)

上图展示了一次正常的响应，总响应时间为 `185ms` 共有一个 Span（基本工作单元，表示一次完整的请求，包含响应，即请求并响应）

Span `/echo/{message}` 说明如下：

- Duration：响应时间 185 毫秒
- component：组件类型为 SpringMVC
- url：请求地址
- http.method：请求类型

### 服务性能指标监控

点击 `Service` 菜单，进入服务性能指标监控页

![](/micro/Lusifer_20190114042528.png)

选择希望监控的服务

![](/micro/Lusifer_20190114042645.png)

- **Avg SLA：** 服务可用性（主要是通过请求成功与失败次数来计算）
- **CPM：** 每分钟调用次数
- **Avg Response Time：** 平均响应时间

点击 `More Server Details...` 还可以查看详细信息

![](/micro/Lusifer_20190114043403.png)

![](/micro/Lusifer_2019011404350001.png)

上图中展示了服务在一定时间范围内的相关数据，包括：

- 服务可用性指标 SLA
- 每分钟平均响应数
- 平均响应时间
- 服务进程 PID
- 服务所在物理机的 IP、Host、OS
- 运行时 CPU 使用率
- 运行时堆内存使用率
- 运行时非堆内存使用率
- GC 情况