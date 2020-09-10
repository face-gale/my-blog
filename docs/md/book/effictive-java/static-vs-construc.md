# Effective Java

## 创建和销毁对象

### 用静态工厂代替构造

- 创建对象有方法名称来做解释
- 为重复的调用返回同一对象，可以不用每次创建新对象
- 可以用父类型做返回值，有更大的灵活性
- 可以通过参数的不同，返回不同的子类
- 方法返回的对象所属的类，可以在编写**静态工厂时**不存在（这里所说的类不存在，只是说类还没有被加载到内存，返回参数是可以使用未被加载到内存的类，只要在编译期import了，就可以）

**简单的静态工厂代码：**

```java
class People {
 
    private String sex = "男";
    private String appearance = "一般";
    private String asset = "穷";//原则上来讲，默认数据要符合普遍情况。
 	private People people;
    //普通构造函数--无参
    public People() {
    }
 
    //普通构造函数--有参
    public People(String sex) {
        this.sex = sex;
    }
 
    public People(String sex, String appearance) {
        this.sex = sex;
        this.appearance = appearance;
    }
 
    public People(String sex, String appearance, String asset) {
        this.sex = sex;
        this.appearance = appearance;
        this.asset = asset;
    }
 
    //静态工厂方法
    public static People createGirlfriend() {//程序员的基本操作，new一个女朋友。
        //这里是我们可控制的，所以你可以选择new新的对象或者使用缓存的已创建的对象
        if(people != null){
        	people = new People();   
        }
        people.sex = "女";
        people.appearance = "倾国倾城";
        people.asset = "市中心十栋楼";
        return people;
    }
 	
    // 返回子类型
    public static People createPeople(){
        return new Children();
    }
}
//People的子类
class Children extends People {
    public Children() {
    }
}
```



**理解方法返回的对象，可以在编写静态工厂方法时不存在**

服务提供者框架包含四大组件：（概念不太好理解，可以直接先看下面的例子讲解，然后回过头来再看概念）

- 服务接口：这是服务提供者要去实现的接口
- 服务提供者接口：生成服务接口实例的工厂对象（就是用来生成服务接口的）（可选）
- 提供者注册API：服务者 提供服务者自身的实现
- 服务访问API：根据客户端指定的某种条件去实现对应的服务提供者

**代码：**

在编写ServiceManager前，LoginService可以不存在

通过反射和泛型创建，LoginService的.class对象已经存在，所以可以导入包（import是编译期的），但是还没将类加载到内存

```java
//四大组成之一：服务接口
public interface LoginService {
    //这是一个登录服务
    public void login();
}
 
//四大组成之二：服务提供者接口
public interface Provider {
    //登录服务的提供者。通俗点说就是：通过这个newLoginService()可以获得一个服务。
    public LoginService newLoginService();
}
 
/**
 * 这是一个服务管理器，里面包含了四大组成中的三和四
 * 解释：通过注册将 服务提供者 加入map，然后通过一个静态工厂方法 getService(String name) 返回不同的服务。
 */
public class ServiceManager {
    //map，保存了注册的服务
    private static final Map<String, Provider> providers = 
        new HashMap<String, Provider>();
 
    private ServiceManager() {
    }
 
    //四大组成之三：提供者注册API  (其实很简单，就是注册一下服务提供者)
    public static void registerProvider(String name, Provider provider) {
        providers.put(name, provider);
    }
 
    //四大组成之四：服务访问API(客户端只需要传递一个name参数，系统会去匹配服务提供者，然后提供服务)
    //(静态工厂方法)
    public static LoginService getService(String name) {
        Provider provider = providers.get(name);
        if (provider == null) {
            throw new IllegalArgumentException(
                "No provider registered with name=" + name);
        }
        return provider.newLoginService();
    }
}
```



