# 如何保证消息的有序性
1. 通过轮询所有队列的方式来确定消息被发送到哪一个队列（负载均衡策略）。订单号相同的消息会被先后发送到同一个队列中，
2. 在获取到路由信息以后，会根据算法来选择一个队列，同一个 OrderId 获取到的肯定是同一个队列。