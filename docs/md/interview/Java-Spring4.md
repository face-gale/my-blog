# 什么是Spring AOP
## 概念
面向切面编程，在我们的应用中，经常需要做一些事情，但是这些事情与核心业务无关，比如，要记录所有 update 方法的执行时间时间，操作人等等信息，记录到日志， 通过 Spring 的 AOP 技术，就可以在不修改 update 的代码的情况下完成该需求。

## Spring AOP 实现原理
Spring AOP 中的动态代理主要有两种方式，**JDK 动态代理** 和 **CGLIB 动态代理**。JDK 动态代理通过反射来接收被代理的类，并且要求被代理的类必须实现一个接口。JDK 动态代理的核心是 `InvocationHandler` 接口和 `Proxy` 类。

如果目标类没有实现接口，那么 Spring AOP 会选择使用 CGLIB 来动态代理目标类。CGLIB（Code Generation Library），是一个代码生成的类库，可以在运行时动态的生成某个类的子类，注意，CGLIB 是通过继承的方式做的动态代理，因此如果某个类被标记为 final，那么它是无法使用 CGLIB 做动态代理的。


## 动态代理（CGLIB 与 JDK）
JDK 动态代理类和委托类需要都实现同一个接口。也就是说只有实现了某个接口的类可以使用 Java 动态代理机制。但是，事实上使用中并不是遇到的所有类都会给你实现一个接口。因此，对于没有实现接口的类，就不能使用该机制。而 CGLIB 则可以实现对类的动态代理。