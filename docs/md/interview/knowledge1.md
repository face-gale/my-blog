# 双亲委派模型
## 类加载器
### 加载类的开放性
类加载器（ClassLoader）是 Java 语言的一项创新，也是 Java 流行的一个重要原因。在类加载的第一阶段“加载”过程中，需要通过一个类的全限定名来获取定义此类的二进制字节流，完成这个动作的代码块就是 类加载器。这一动作是放在 Java 虚拟机外部去实现的，以便让应用程序自己决定如何获取所需的类。

虚拟机规范并没有指明二进制字节流要从一个 Class 文件获取，或者说根本没有指明从哪里获取、怎样获取。这种开放使得 Java 在很多领域得到充分运用，例如：
- 从 ZIP 包中读取，这很常见，成为 JAR，EAR，WAR 格式的基础
- 从网络中获取，最典型的应用就是 Applet
- 运行时计算生成，最典型的是动态代理技术，在 `java.lang.reflect.Proxy` 中，就是用了 `ProxyGenerator.generateProxyClass` 来为特定接口生成形式为“*$Proxy”的代理类的二进制字节流
- 有其他文件生成，最典型的 JSP 应用，由 JSP 文件生成对应的 Class 类
### 类加载器与类的唯一性

类加载器虽然只用于实现类的加载动作，但是对于任意一个类，都需要由加载它的类加载器和这个类本身共同确立其在 Java 虚拟机中的 唯一性。通俗的说，JVM 中两个类是否“相等”，首先就必须是同一个类加载器加载的，否则，即使这两个类来源于同一个 Class 文件，被同一个虚拟机加载，只要类加载器不同，那么这两个类必定是不相等的。

这里的“相等”，包括代表类的 Class 对象的 `equals()` 方法、`isAssignableFrom()` 方法、`isInstance()` 方法的返回结果，也包括使用 `instanceof` 关键字做对象所属关系判定等情况。

下代码说明了不同的类加载器对 `instanceof` 关键字运算的结果的影响。
```
package com.jvm.classloading;

import java.io.IOException;
import java.io.InputStream;

/**
 * 类加载器在类相等判断中的影响
 * 
 * instanceof关键字
 * 
 */

public class ClassLoaderTest {
    public static void main(String[] args) throws Exception {
        // 自定义类加载器
        ClassLoader myLoader = new ClassLoader() {
            @Override
            public Class<?> loadClass(String name) throws ClassNotFoundException {
                try {
                    String fileName = name.substring(name.lastIndexOf(".") + 1) + ".class";
                    InputStream is = getClass().getResourceAsStream(fileName);
                    if (is == null) {
                        return super.loadClass(fileName);
                    }
                    byte[] b = new byte[is.available()];
                    is.read(b);
                    return defineClass(name, b, 0, b.length);   
                } catch (IOException e) {
                    throw new ClassNotFoundException();
                }
            }
        };

        // 使用 ClassLoaderTest 的类加载器加载本类
        Object obj1 = ClassLoaderTest.class.getClassLoader().loadClass("com.jvm.classloading.ClassLoaderTest").newInstance();
        System.out.println(obj1.getClass());
        System.out.println(obj1 instanceof com.jvm.classloading.ClassLoaderTest);

        // 使用自定义类加载器加载本类
        Object obj2 = myLoader.loadClass("com.jvm.classloading.ClassLoaderTest").newInstance();
        System.out.println(obj2.getClass());
        System.out.println(obj2 instanceof com.jvm.classloading.ClassLoaderTest);
    }
}
```
输出结果：
```
class com.jvm.classloading.ClassLoaderTest
true
class com.jvm.classloading.ClassLoaderTest
false
```