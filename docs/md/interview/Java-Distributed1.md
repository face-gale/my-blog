# 谈谈业务中使用分布式的场景
首先，需要了解系统为什么使用分布式。

随着互联网的发展，传统单工程项目的很多性能瓶颈越发凸显，性能瓶颈可以有几个方面：

1. 应用服务层：随着用户量的增加，并发量增加，单项目难以承受如此大的并发请求导致的性能瓶颈。
2. 底层数据库层：随着业务的发展，数据库压力越来越大，导致的性能瓶颈。
## 场景1：应用系统集群的 Session 共享
应用系统集群最简单的就是服务器集群，比如：Tomcat 集群。应用系统集群的时候，比较凸显的问题是 Session 共享，Session 共享我们一是可以通过服务器插件来解决。另外一种也可以通过 Redis 等中间件实现。

## 场景2：应用系统的服务化拆分
服务化拆分，是目前非常火热的一种方式。现在都在提微服务。通过对传统项目进行服务化拆分，达到服务独立解耦，单服务又可以横向扩容。服务化拆分遇到的经典问题就是分布式事务问题。目前，比较常用的分布式事务解决方案有几种：消息最终一致性、TCC 补偿型事务等。

## 场景3：底层数据库的压力分摊
如果系统的性能压力出现在数据库，那我们就可以读写分离、分库分表等方案进行解决。