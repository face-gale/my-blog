# RocketMQ-生产者

## 概述

RocketMQ 是一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务。

由于本教程整个案例基于 Spring Cloud，故我们采用 Spring Cloud Stream 完成一次发布和订阅

[官方教程](https://github.com/spring-cloud-incubator/spring-cloud-alibaba/blob/master/spring-cloud-alibaba-examples/rocketmq-example/readme-zh.md)

## Spring Cloud Stream

Spring Cloud Stream 是一个用于构建基于消息的微服务应用框架。它基于 Spring Boot 来创建具有生产级别的单机 Spring 应用，并且使用 `Spring Integration` 与 Broker 进行连接。

Spring Cloud Stream 提供了消息中间件配置的统一抽象，推出了 `publish-subscribe`、`consumer groups`、`partition` 这些统一的概念。

Spring Cloud Stream 内部有两个概念：

- **Binder：** 跟外部消息中间件集成的组件，用来创建 Binding，各消息中间件都有自己的 Binder 实现。
- **Binding：** 包括 Input Binding 和 Output Binding。

Binding 在消息中间件与应用程序提供的 Provider 和 Consumer 之间提供了一个桥梁，实现了开发者只需使用应用程序的 Provider 或 Consumer 生产或消费数据即可，屏蔽了开发者与底层消息中间件的接触。

![](/micro/111111111111.png)

## 解决连接超时问题

在之前的 [基于 Docker 安装 RocketMQ](/zh/spring-cloud-alibaba/基于-Docker-安装-RocketMQ.html#基于-docker-安装-rocketmq) 章节中，我们采用 Docker 部署了 RocketMQ 服务，此时 RocketMQ Broker 暴露的地址和端口(10909，10911)是基于容器的，会导致我们开发机无法连接，从而引发 `org.apache.rocketmq.remoting.exception.RemotingTooMuchRequestException: sendDefaultImpl call timeout` 异常

注意下图中的 IP 地址，这个是容器的 IP，开发机与容器不在一个局域网所以无法连接。

![](/micro/Lusifer_20190116045601.png)

解决方案是在 `broker.conf` 配置文件中增加 `brokerIP1=宿主机IP` 即可

## POM

主要增加了 `org.springframework.cloud:spring-cloud-starter-stream-rocketmq` 依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.funtl</groupId>
        <artifactId>hello-spring-cloud-alibaba-dependencies</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <relativePath>../hello-spring-cloud-alibaba-dependencies/pom.xml</relativePath>
    </parent>

    <artifactId>hello-spring-cloud-alibaba-rocketmq-provider</artifactId>
    <packaging>jar</packaging>

    <name>hello-spring-cloud-alibaba-rocketmq-provider</name>
    <url>http://www.funtl.com</url>
    <inceptionYear>2018-Now</inceptionYear>

    <dependencies>
        <!-- Spring Boot Begin -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <!-- Spring Boot End -->

        <!-- Spring Cloud Begin -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-stream-rocketmq</artifactId>
        </dependency>
        <!-- Spring Cloud End -->
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.funtl.hello.spring.cloud.alibaba.rocketmq.provider.RocketMQProviderApplication</mainClass>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

## 消息生产者服务

```java
package com.funtl.hello.spring.cloud.alibaba.rocketmq.provider.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
public class ProviderService {
    @Autowired
    private MessageChannel output;

    public void send(String message) {
        output.send(MessageBuilder.withPayload(message).build());
    }
}
```

## Application

配置 Output(`Source.class`) 的 Binding 信息并配合 `@EnableBinding` 注解使其生效

```java
package com.funtl.hello.spring.cloud.alibaba.rocketmq.provider;

import com.funtl.hello.spring.cloud.alibaba.rocketmq.provider.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.messaging.Source;

@SpringBootApplication
@EnableBinding({Source.class})
public class RocketMQProviderApplication implements CommandLineRunner {

    @Autowired
    private ProviderService providerService;

    public static void main(String[] args) {
        SpringApplication.run(RocketMQProviderApplication.class, args);
    }

    /**
     * 实现了 CommandLineRunner 接口，只是为了 Spring Boot 启动时执行任务，不必特别在意
     * @param args
     * @throws Exception
     */
    @Override
    public void run(String... args) throws Exception {
        providerService.send("Hello RocketMQ");
    }
}
```

## application.yml

```yaml
spring:
  application:
    name: rocketmq-provider
  cloud:
    stream:
      rocketmq:
        binder:
          # RocketMQ 服务器地址
          namesrv-addr: 192.168.10.149:9876
      bindings:
        # 这里是个 Map 类型参数，{} 为 YAML 中 Map 的行内写法
        output: {destination: test-topic, content-type: application/json}

server:
  port: 9093

management:
  endpoints:
    web:
      exposure:
        include: '*'
```

运行成功后即可在 RocketMQ 控制台的 `消息` 列表中选择 `test-topic` 主题即可看到发送的消息