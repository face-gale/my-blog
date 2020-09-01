# 线性表
## 概述
> 线性表：零个或者多个数据元素的有限序列。

性质：

- 数据元素可以为空
- 数据元素有限
- 数据元素之间的逻辑结构为线性结构，也就是一对一的关系
- 数据元素类型相同

```c
举个例子：
白羊 -> 金牛 -> 双子 -> 巨蟹 -> 狮子 -> 处女 -> 天秤 -> 射手 -> 摩羯 -> 水平 -> 双鱼

线性表的抽象数据类型：
ADT 线性表（List）
Data
      线性表的数据对象集合为{a1, a2, ......, an}，每一个元素的类型都是DataType。其中，除第一个元素a1外，每一个元素有且仅有一个直接前驱元素，除了最后一个元素an外，每一个元素有且仅有一个直接后续元素。数据元素之间的关系是一对一的关系。
Operation
       count：线性表元素个数。
       first：头指针。
       last：尾指针。
       isEmpty()：若线性表为空，返回true，否则返回false。
       remove()：将线性表清空
       node(i)：将线性表中的第i个位置的元素返回。
       insert(data,i)：在线性表中的第i个位置插入新数据data。
EndADT
```

线性表根据在计算机的储存方式可以分为两种：

- 顺序线性表
- 链式线性表

## 顺序线性表

> 顺序线性表：使用一段连续的地址存储单元放置线性表的数据元素。逻辑顺序和物理顺序相同

举个例子：数组。

```rust
顺序线性表的优缺点：
优点：
- 可以快速获取下标的数据元素，时间复杂度为O(1)
- 逻辑关系是一对一的关系，连续存储单元足以储存，不需要增加额外的存储空间

缺点：
- 插入和删除操作需要移动大量的元素，时间复杂度为O(n)
- 线性表的存储空间大小难以确定，并且不好扩展
- 造成存储空间碎片
```

### 顺序表API设计：

|   类名   | **SequenceList**                                             |
| :------: | :----------------------------------------------------------- |
| 构造方法 | SequenceList(int capacity)：创建容量为capacity的SequenceList对象 |
| 成员方法 | 1.public void clear()：空置线性表 <br />2.publicboolean isEmpty()：判断线性表是否为空，是返回true，否返回false<br />3.public int length():获取线性表中元素的个数<br />4.public T get(int i):读取并返回线性表中的第i个元素的值<br />5.public void insert(int i,T t)：在线性表的第i个元素之前插入一个值为t的数据元素。<br />6.public void insert(T t):向线性表中添加一个元素t<br />7.public T remove(int i):删除并返回线性表中第i个数据元素。<br />8.public int indexOf(T t):返回线性表中首次出现的指定的数据元素的位序号，若不存在，则返回-1。 |
| 成员变量 | 1.private T[] eles：存储元素的数组<br />2.private int N:当前线性表的长度 |



### 顺序表的代码实现：

```java

//顺序表代码 
public class SequenceList<T> { 

    //存储元素的数组 
    private T[] eles; 

    //记录当前顺序表中的元素个数 
    private int N; 

    //构造方法 
    public SequenceList(int capacity){ 
        eles = (T[])new Object[capacity]; 
        N=0; 
    }

    //将一个线性表置为空表 
    public void clear(){ 
        N=0; 
    }

    //判断当前线性表是否为空表 
    public boolean isEmpty(){
        return N==0; 
    }

    //获取线性表的长度 
    public int length(){ 
        return N; 
    }

    //获取指定位置的元素 
    public T get(int i){ 
        if (i<0 || i>=N){ 
            throw new RuntimeException("当前元素不存在！"); 
        }
        return eles[i]; 
    }

    //向线型表中添加元素t 
    public void insert(T t){ 
        if (N==eles.length){ 
            throw new RuntimeException("当前表已满"); 
        }
        eles[N++] = t; 
    }

    //在i元素处插入元素t 
    public void insert(int i,T t){ 
        
        if (i==eles.length){ 
            throw new RuntimeException("当前表已满"); 
        }
        if (i<0 || i>N){ 
            throw new RuntimeException("插入的位置不合法"); 
        }
        //把i位置空出来，i位置及其后面的元素依次向后移动一位 
        for (int index=N;index>i;index--){ 
            eles[index]=eles[index-1]; 
        }
        //把t放到i位置处 
        eles[i]=t; 
        //元素数量+1 
        N++; 

    }

    //删除指定位置i处的元素，并返回该元素 
    public T remove(int i){ 
        if (i<0 || i>N-1){ 
            throw new RuntimeException("当前要删除的元素不存在"); 
        }
        //记录i位置处的元素 
        T result = eles[i]; 
        //把i位置后面的元素都向前移动一位 
    
		for (int index=i;index<N-1;index++){ 
            eles[index]=eles[index+1]; 
        }

        //当前元素数量-1 
        N--; 
        return result; 

    }

    //查找t元素第一次出现的位置 
    public int indexOf(T t){ 
        if(t==null){ 
            throw new RuntimeException("查找的元素不合法"); 
        }
        for (int i = 0; i < N; i++) { 
            if (eles[i].equals(t)){ 
                return i; 
            } 
        }
        return -1; 
    } 

}

//测试代码 
public class SequenceListTest { 

    public static void main(String[] args) { 

        //创建顺序表对象 
        SequenceList<String> sl = new SequenceList<>(10); 

        //测试插入 
        sl.insert("姚明"); 
        sl.insert("科比"); 
        sl.insert("麦迪"); 
        sl.insert(1,"詹姆斯"); 

        //测试获取 
        String getResult = sl.get(1); 
        System.out.println("获取索引1处的结果为："+getResult); 

        //测试删除 
        String removeResult = sl.remove(0); 
        System.out.println("删除的元素是："+removeResult); 

        //测试清空 
        sl.clear(); 
        System.out.println("清空后的线性表中的元素个数为:"+sl.length()); 

    } 

} 
```



### 顺序表的遍历

在java中，遍历集合的方式一般都是用的是foreach循环，如果想让我们的SequenceList也能支持foreach循环，则需要做如下操作：

- 让SequenceList实现Iterable接口，重写iterator方法；

- 在SequenceList内部提供一个内部类SIterator,实现Iterator接口，重写hasNext方法和next方法；

代码：

```java
//顺序表代码 
import java.util.Iterator; 

public class SequenceList<T> implements Iterable<T>{ 

    //存储元素的数组 
    private T[] eles; 

    //记录当前顺序表中的元素个数 
    private int N; 

    //构造方法 
    public SequenceList(int capacity){ 
        eles = (T[])new Object[capacity]; 
        N=0; 
    }

    //将一个线性表置为空表 
    public void clear(){ 
    	N=0; 
    }

    //判断当前线性表是否为空表 
    public boolean isEmpty(){ 
    	return N==0; 
    }

    //获取线性表的长度 
    public int length(){ 
    	return N; 
    }

    //获取指定位置的元素 
    public T get(int i){ 
        if (i<0 || i>=N){ 
            throw new RuntimeException("当前元素不存在！"); 
        }
    	return eles[i]; 
    }

    //向线型表中添加元素t 
    public void insert(T t){ 
        if (N==eles.length){ 
        	throw new RuntimeException("当前表已满"); 
        }
        eles[N++] = t; 
    }
    
    //在i元素处插入元素t 
    public void insert(int i,T t){ 
        if (i==eles.length){ 
        	throw new RuntimeException("当前表已满"); 
        }

        if (i<0 || i>N){ 
        	throw new RuntimeException("插入的位置不合法"); 
    	}

        //把i位置空出来，i位置及其后面的元素依次向后移动一位 
        for (int index=N;index>i;index--){ 
        	eles[index]=eles[index-1]; 
        }

        //把t放到i位置处 
        eles[i]=t; 

        //元素数量+1 
        N++; 
    }

    //删除指定位置i处的元素，并返回该元素 
    public T remove(int i){ 

        if (i<0 || i>N-1){ 
        	throw new RuntimeException("当前要删除的元素不存在"); 
        }

        //记录i位置处的元素 
        T result = eles[i]; 
        
        //把i位置后面的元素都向前移动一位 
        for (int index=i;index<N-1;index++){ 
        	eles[index]=eles[index+1]; 
        }

        //当前元素数量-1 
        N--; 
        return result; 
    }

    //查找t元素第一次出现的位置 
    public int indexOf(T t){ 
        if(t==null){ 
        	throw new RuntimeException("查找的元素不合法"); 
        }

        for (int i = 0; i < N; i++) { 
            if (eles[i].equals(t)){ 
            	return i; 
            } 
        }

        return -1; 

    }

    //打印当前线性表的元素
    public void showEles(){ 
        for (int i = 0; i < N; i++) { 
        	System.out.print(eles[i]+" "); 
        }
        System.out.println(); 
    }

    @Override 
    public Iterator iterator() { 
    	return new SIterator(); 
    }

    private class SIterator implements Iterator{ 

        private int cur; 

        public SIterator(){ 
        	this.cur=0; 
        }

        @Override 
        public boolean hasNext() { 
        	return cur<N; 
        }

        @Override 
        public T next() { 
        	return eles[cur++]; 
        } 

    } 

}

//测试代码 
public class Test { 

    public static void main(String[] args) throws Exception { 
        SequenceList<String> squence = new SequenceList<>(5); 

        //测试遍历 
        squence.insert(0, "姚明"); 
        squence.insert(1, "科比"); 
        squence.insert(2, "麦迪"); 
        squence.insert(3, "艾佛森"); 
        squence.insert(4, "卡特"); 

        for (String s : squence) { 
            System.out.println(s); 
        } 
    } 
} 
```



### 顺序表的时间复杂度

- get(i)

  不难看出，不论数据元素量N有多大，只需要一次eles[i]就可以获取到对应的元素，所以时间复杂度为O(1);

- insert(int i,T t)

  每一次插入，都需要把i位置后面的元素移动一次，随着元素数量N的增大，移动的元素也越多，时间复杂为O(n);

- remove(int i)

  每一次删除，都需要把i位置后面的元素移动一次，随着数据量N的增大,移动的元素也越多，时间复杂度为O(n);

​       由于顺序表的底层由数组实现，数组的长度是固定的，所以在操作的过程中涉及到了容器扩容操作。这样会导致顺序表在使用过程中的时间复杂度不是线性的，在某些需要扩容的结点处，耗时会突增，尤其是元素越多，这个问题越明显



## 链式线性表

> 链式线性表：线性表的数据元素可以存储在随意的存储单元，每一个节点不仅仅包括数据元素还有一个指向下一个节点的指针（基本的单链表）。

链式（单链表）和顺序线性表优缺点对比：

```rust
存储分配方式：
- 顺序 -> 一段地址连续的存储空间
- 链式 -> 任意地址存储空间

时间性能：
- 查找
  顺序 -> O(1)
  链式 -> O(n)
- 插入和删除
  顺序 -> O(n)
  链式 -> 寻找相应的节点，时间复杂度为O(n)，然后，插入和删除为O(1)

空间性能：
- 顺序 -> 需要提前分配存储空间，分配大了，浪费空间，分配小了，容易发生上溢
- 链式 -> 不需要提前分配空间，只要有存储空间分配就行，数据元素个数只受可分配存储空间大小的限制
```

总结：
 （1）若线性表需要频繁查找，很少进行插入和删除操作时，使用顺序存储结构；反之，使用链式存储结构。
 （2）如果提前知道线性表需要的存储空间，可以使用顺序结构；如果不知道线性表中的数据元素变化有多大，即不确定需要多大的存储空间，则使用链式存储结构。

链式线性表的基本分类：

- 单向链表
- 静态链表 -> 使用顺序结构实现链式线性表
- 双向链表 -> 每个节点除了数据元素，还包含一个指向上一个节点的指针和一个指向下一个节点的指针
- 循环链表 -> 线性表的尾部指向头节点，形成一个闭环

下面具体讲解双链表的Swift实现，其他的链表实现可以参考《大话数据结构》或者自行Googel/Baidu。

> 双向链表：在单链表的基础上，每个节点加一个指向上一个节点的指针。



### 单向链表节点API设计

|   类名   | Node                                           |
| :------: | ---------------------------------------------- |
| 构造方法 | Node(T t,Node next)：创建Node对象              |
| 成员变量 | T item:存储数据<br />Node next：指向下一个结点 |

节点定义：

```java
public class Node<T> { 

    //存储元素 
    public T item; 

    //指向下一个结点 
    public Node next; 

    public Node(T item, Node next) { 
        this.item = item; 
        this.next = next; 
    } 
}
```

生成链表：

```java
public static void main(String[] args) throws Exception { 

    //构建结点 
    Node<Integer> first = new Node<Integer>(11, null); 
    Node<Integer> second = new Node<Integer>(13, null); 
    Node<Integer> third = new Node<Integer>(12, null); 
    Node<Integer> fourth = new Node<Integer>(8, null); 
    Node<Integer> fifth = new Node<Integer>(9, null); 

    //生成链表 
    first.next = second; 
    second.next = third; 
    third.next = fourth; 
    fourth.next = fifth; 

} 
```



### 单向链表API设计

|    类名    | LinkList                                                     |
| :--------: | ------------------------------------------------------------ |
|  构造方法  | LinkList()：创建LinkList对象                                 |
|  成员方法  | 1.public void clear()：空置线性表 <br/>2.publicboolean isEmpty()：判断线性表是否为空，是返回true，否返回false<br/>3.public int length():获取线性表中元素的个数<br/>4.public T get(int i):读取并返回线性表中的第i个元素的值<br/>5.public void insert(T t)：往线性表中添加一个元素；<br/>6.public void insert(int i,T t)：在线性表的第i个元素之前插入一个值为t的数据元素。<br/>7.public T remove(int i):删除并返回线性表中第i个数据元素。<br/>8.public int indexOf(T t):返回线性表中首次出现的指定的数据元素的位序号，若不存在，则返回-1。 |
| 成员内部类 | private class Node:结点类                                    |
|  成员变量  | 1.private Node head:记录首结点<br/>2.private int N:记录链表的长度 |



 ### 单向链表代码实现

```java
//单向列表代码 

import java.util.Iterator; 

public class LinkList<T> implements Iterable<T> { 

    //记录头结点 
    private Node head; 

    //记录链表的长度 
    private int N; 

    public LinkList(){ 
        //初始化头结点 
        head = new Node(null,null); 
        N=0; 
    }

    //清空链表 
    public void clear(){ 
        head.next=null; 
        head.item=null; 
        N=0; 

    }

    //获取链表的长度 
    public int length(){ 
        return N; 
    }

    //判断链表是否为空 
    public boolean isEmpty(){ 
        return N==0; 
    }

    //获取指定位置i出的元素 
    public T get(int i){ 
        if (i<0||i>=N){ 
            throw new RuntimeException("位置不合法！"); 
        }
        Node n = head.next; 
        for (int index = 0; index < i; index++) { 
            n = n.next; 
        }
        return n.item; 

    }

    //向链表中添加元素t 
    public void insert(T t){ 

        //找到最后一个节点 
        Node n = head; 
        while(n.next!=null){ 
            n = n.next; 
        }

        Node newNode = new Node(t, null); 
        n.next = newNode; 

        //链表长度+1 
        N++; 

    }

    //向指定位置i处，添加元素t 
    public void insert(int i,T t){ 

        if (i<0||i>=N){ 
            throw new RuntimeException("位置不合法！"); 
        }

        //寻找位置i之前的结点 
        Node pre = head; 
        for (int index = 0; index <=i-1; index++) { 
            pre = pre.next; 
        }

        //位置i的结点 
        Node curr = pre.next; 

        //构建新的结点，让新结点指向位置i的结点
        Node newNode = new Node(t, curr); 

        //让之前的结点指向新结点 
        pre.next = newNode; 

        //长度+1 
        N++; 

    }

    //删除指定位置i处的元素，并返回被删除的元素 
    public T remove(int i){ 

        if (i<0 || i>=N){ 
            throw new RuntimeException("位置不合法"); 
        }

        //寻找i之前的元素 
        Node pre = head; 

        for (int index = 0; index <=i-1; index++) { 
            pre = pre.next; 
        }

        //当前i位置的结点 
        Node curr = pre.next; 

        //前一个结点指向下一个结点，删除当前结点 
        pre.next = curr.next; 

        //长度-1 
        N--; 
        return curr.item; 

    }

    //查找元素t在链表中第一次出现的位置 
    public int indexOf(T t){ 

        Node n = head; 
        for (int i = 0;n.next!=null;i++){ 
            n = n.next; 
            if (n.item.equals(t)){ 
                return i; 
            } 
        }
        return -1; 
    }

    //结点类 
    private class Node{ 

        //存储数据 
        T item; 
        //下一个结点 
        Node next; 

        public Node(T item, Node next) { 
            this.item = item; 
            this.next = next; 
        }
    }

    @Override 
    public Iterator iterator() { 
        return new LIterator(); 
    }

    private class LIterator implements Iterator<T>{ 

        private Node n; 

        public LIterator() { 
            this.n = head; 
        }

        @Override 
        public boolean hasNext() { 
            return n.next!=null; 
        }

        @Override 
        public T next() { 
            n = n.next; 
            return n.item; 
        } 
    } 
}

//测试代码 
public class Test { 

    public static void main(String[] args) throws Exception { 

        LinkList<String> list = new LinkList<>(); 
        list.insert(0,"张三"); 
        list.insert(1,"李四"); 
        list.insert(2,"王五"); 
        list.insert(3,"赵六"); 

        //测试length方法 
        for (String s : list) { 
            System.out.println(s); 
        }

        System.out.println(list.length()); 
        System.out.println("-------------------"); 

        //测试get方法 
        System.out.println(list.get(2)); 
        System.out.println("------------------------"); 

        //测试remove方法 
        String remove = list.remove(1); 
        System.out.println(remove); 
        System.out.println(list.length()); 
        System.out.println("----------------");; 
        for (String s : list) { 
            System.out.println(s); 
        }
    } 

} 
```



### 双向链表结点API设计

|   类名   | Node                                                         |
| :------: | ------------------------------------------------------------ |
| 构造方法 | Node(T t,Node pre,Node next)：创建Node对象                   |
| 成员变量 | T item:存储数据<br/>Node next：指向下一个结点<br/>Node pre:指向上一个结点 |



### 双向链表API设计

|    类名    | TowWayLinkList                                               |
| :--------: | ------------------------------------------------------------ |
|  构造方法  | TowWayLinkList()：创建TowWayLinkList对象                     |
|  成员方法  | 1.public void clear()：空置线性表 <br/>2.publicboolean isEmpty()：判断线性表是否为空，是返回true，否返回false<br/>3.public int length():获取线性表中元素的个数<br/>4.public T get(int i):读取并返回线性表中的第i个元素的值<br/>5.public void insert(T t)：往线性表中添加一个元素；<br/>6.public void insert(int i,T t)：在线性表的第i个元素之前插入一个值为t的数据元素。<br/>7.public T remove(int i):删除并返回线性表中第i个数据元素。<br/>8.public int indexOf(T t):返回线性表中首次出现的指定的数据元素的位序号，若不存在，则<br/>返回-1。<br/>9.public T getFirst():获取第一个元素<br/>10.public T getLast():获取最后一个元素 |
| 成员内部类 | private class Node:结点类                                    |
|  成员变量  | 1.private Node first:记录首结点<br/>2.private Node last:记录尾结点<br/>2.private int N:记录链表的长度 |



### 双向链表代码实现

```java
//双向链表代码 
import java.util.Iterator; 

public class TowWayLinkList<T> implements Iterable<T>{ 

    //首结点 
    private Node head; 

    //最后一个结点 
    private Node last; 

    //链表的长度 
    private int N; 

    public TowWayLinkList() { 
        last = null; 
        head = new Node(null,null,null); 
        N=0; 
    }

    //清空链表 
    public void clear(){ 
        last=null; 
        head.next=last; 
        head.pre=null; 
        head.item=null;
        N=0; 
    }

    //获取链表长度 
    public int length(){ 
        return N; 
    }

    //判断链表是否为空 
    public boolean isEmpty(){ 
        return N==0; 
    }

    //插入元素t 
    public void insert(T t){ 
        if (last==null){ 
            last = new Node(t,head,null); 
            head.next = last; 
        }else{
            Node oldLast = last; 
            Node node = new Node(t, oldLast, null); 
            oldLast.next = node; 
            last = node; 
        }
        //长度+1 
        N++; 
    }

    //向指定位置i处插入元素t 
    public void insert(int i,T t){ 
        if (i<0 || i>=N){ 
            throw new RuntimeException("位置不合法"); 
        }
        //找到位置i的前一个结点 
        Node pre = head; 
        for (int index = 0; index < i; index++) { 
            pre = pre.next; 
        }

        //当前结点 
        Node curr = pre.next; 

        //构建新结点 
        Node newNode = new Node(t, pre, curr); 
        curr.pre= newNode; 
        pre.next = newNode; 

        //长度+1 
        N++; 
    }

    //获取指定位置i处的元素 
    public T get(int i){ 
        if (i<0||i>=N){ 
            throw new RuntimeException("位置不合法"); 
        }

        //寻找当前结点 
        Node curr = head.next; 
        for (int index = 0; index <i; index++) { 
            curr = curr.next; 
        }
        return curr.item; 
    }

    //找到元素t在链表中第一次出现的位置 
    public int indexOf(T t){ 
        Node n= head; 
        for (int i=0;n.next!=null;i++){ 
            n = n.next; 
            if (n.next.equals(t)){ 
                return i; 
            } 
        }
        return -1; 
    }

    //删除位置i处的元素，并返回该元素 
    public T remove(int i){ 
        if (i<0 || i>=N){ 
            throw new RuntimeException("位置不合法"); 
        }

        //寻找i位置的前一个元素 
        Node pre = head; 
        for (int index = 0; index <i ; index++) { 
            pre = pre.next; 
        }

        //i位置的元素 
        Node curr = pre.next; 

        //i位置的下一个元素 
        Node curr_next = curr.next; 
        pre.next = curr_next; 
        curr_next.pre = pre; 

        //长度-1； 
        N--; 
        return curr.item; 
    }

    //获取第一个元素 
    public T getFirst(){ 
        if (isEmpty()){ 
            return null; 
        }
        return head.next.item; 
    } 
    //获取最后一个元素 
    public T getLast(){ 
        if (isEmpty()){ 
            return null; 
        }
        return last.item; 
    }

    @Override 
    public Iterator<T> iterator() { 
        return new TIterator(); 
    }

    private class TIterator implements Iterator{ 

        private Node n = head; 

        @Override 
        public boolean hasNext() { 
            return n.next!=null; 
        }

        @Override 
        public Object next() { 
            n = n.next; 
            return n.item; 
        } 
    }

    //结点类 
    private class Node{ 

        public Node(T item, Node pre, Node next) { 
            this.item = item; 
            this.pre = pre; 
            this.next = next; 
        }

        //存储数据 
        public T item; 

        //指向上一个结点 
        public Node pre; 

        //指向下一个结点 
        public Node next; 
    } 
}

//测试代码 
public class Test { 

    public static void main(String[] args) throws Exception { 

        TowWayLinkList<String> list = new TowWayLinkList<>(); 
        list.insert("乔峰"); 
        list.insert("虚竹");
        list.insert("段誉"); 
        list.insert(1,"鸠摩智"); 
        list.insert(3,"叶二娘"); 

        for (String str : list) { 
            System.out.println(str); 
        }

        System.out.println("----------------------"); 

        String tow = list.get(2); 
        System.out.println(tow); 

        System.out.println("-------------------------"); 

        String remove = list.remove(3); 
        System.out.println(remove); 
        System.out.println(list.length()); 

        System.out.println("--------------------"); 

        System.out.println(list.getFirst()); 
        System.out.println(list.getLast()); 

    } 
} 
```



### 快慢指针

​		快慢指针指的是定义两个指针，这两个指针的移动速度一块一慢，以此来制造出自己想要的差值，这个差值可以让我们找到链表上相应的结点。一般情况下，快指针的移动步长为慢指针的两倍。
- 中间值问题
```java

public class FastSlowTest {

    public static void main(String[] args) throws Exception {
        //创建结点
        Node<String> first = new Node<String>("aa", null);
        Node<String> second = new Node<String>("bb", null);
        Node<String> third = new Node<String>("cc", null);
        Node<String> fourth = new Node<String>("dd", null);
        Node<String> fifth = new Node<String>("ee", null);
        Node<String> six = new Node<String>("ff", null);
        Node<String> seven = new Node<String>("gg", null);

        //完成结点之间的指向
        first.next = second;
        second.next = third;
        third.next = fourth;
        fourth.next = fifth;
        fifth.next = six;
        six.next = seven;

        //查找中间值
        String mid = getMid(first);
        System.out.println("中间值为："+mid);
    }

    /**
     * @param first 链表的首结点
     * @return 链表的中间结点的值
     */
    public static String getMid(Node<String> first) {
        //定义两个指针
        Node<String> fast = first;
        Node<String> slow = first;
        //使用两个指针遍历链表，当快指针指向的结点没有下一个结点了，就可以结束了，结束之后，慢指针指向的结点就是中间值
        while(fast!=null &&fast.next!=null){
            //变化fast的值和slow的值
            fast = fast.next.next;
            slow=slow.next;
        }

        return slow.item;
    }

    //结点类
    private static class Node<T> {
        //存储数据
        T item;
        //下一个结点
        Node next;

        public Node(T item, Node next) {
            this.item = item;
            this.next = next;
        }
    }
}

```
- 单向链表是否有环问题
```java

public class CircleListCheckTest {
    public static void main(String[] args) throws Exception {
        //创建结点
        Node<String> first = new Node<String>("aa", null);
        Node<String> second = new Node<String>("bb", null);
        Node<String> third = new Node<String>("cc", null);
        Node<String> fourth = new Node<String>("dd", null);
        Node<String> fifth = new Node<String>("ee", null);
        Node<String> six = new Node<String>("ff", null);
        Node<String> seven = new Node<String>("gg", null);

        //完成结点之间的指向
        first.next = second;
        second.next = third;
        third.next = fourth;
        fourth.next = fifth;
        fifth.next = six;
        six.next = seven;
//        //产生环
//        seven.next = third;

        //判断链表是否有环
        boolean circle = isCircle(first);
        System.out.println("first链表中是否有环："+circle);
    }

    /**
     * 判断链表中是否有环
     * @param first 链表首结点
     * @return ture为有环，false为无环
     */
    public static boolean isCircle(Node<String> first) {
        //定义快慢指针
        Node<String> fast = first;
        Node<String> slow = first;

        //遍历链表，如果快慢指针指向了同一个结点，那么证明有环
        while(fast!=null && fast.next!=null){
            //变换fast和slow
            fast = fast.next.next;
            slow = slow.next;

            if (fast.equals(slow)){
                return true;
            }
        }

        return false;
    }

    //结点类
    private static class Node<T> {
        //存储数据
        T item;
        //下一个结点
        Node next;

        public Node(T item, Node next) {
            this.item = item;
            this.next = next;
        }
    }
}

```
- 有环表入口问题
```java

public class CircleListInTest {
    public static void main(String[] args) throws Exception {
        Node<String> first = new Node<String>("aa", null);
        Node<String> second = new Node<String>("bb", null);
        Node<String> third = new Node<String>("cc", null);
        Node<String> fourth = new Node<String>("dd", null);
        Node<String> fifth = new Node<String>("ee", null);
        Node<String> six = new Node<String>("ff", null);
        Node<String> seven = new Node<String>("gg", null);

        //完成结点之间的指向
        first.next = second;
        second.next = third;
        third.next = fourth;
        fourth.next = fifth;
        fifth.next = six;
        six.next = seven;
        //产生环
        seven.next = third;

        //查找环的入口结点
        Node<String> entrance = getEntrance(first);
        System.out.println("first链表中环的入口结点元素为："+entrance.item);
    }

    /**
     * 查找有环链表中环的入口结点
     * @param first 链表首结点
     * @return 环的入口结点
     */
    public static Node getEntrance(Node<String> first) {
        //定义快慢指针
        Node<String> fast = first;
        Node<String> slow = first;
        Node<String> temp = null;

        //遍历链表，先找到环(快慢指针相遇),准备一个临时指针，指向链表的首结点，继续遍历，直到慢指针和临时指针相遇，那么相遇时所指向的结点就是环的入口
        while(fast!=null && fast.next!=null){
            //变换快慢指针
            fast = fast.next.next;
            slow = slow.next;

            //判断快慢指针是否相遇
            if (fast.equals(slow)){
                temp = first;
                continue;
            }

            //让临时结点变换
            if (temp!=null){
                temp = temp.next;
                //判断临时指针是否和慢指针相遇
                if (temp.equals(slow)){
                    break;
                }
            }
        }

        return temp;
    }
    //结点类
    private static class Node<T> {
        //存储数据
        T item;
        //下一个结点
        Node next;

        public Node(T item, Node next) {
            this.item = item;
            this.next = next;
        }
    }
}

```



### 循环链表

```java
public class CircleListInTest {
    public static void main(String[] args) throws Exception {
        Node<String> first = new Node<String>("aa", null);
        Node<String> second = new Node<String>("bb", null);
        Node<String> third = new Node<String>("cc", null);
        Node<String> fourth = new Node<String>("dd", null);
        Node<String> fifth = new Node<String>("ee", null);
        Node<String> six = new Node<String>("ff", null);
        Node<String> seven = new Node<String>("gg", null);

        //完成结点之间的指向
        first.next = second;
        second.next = third;
        third.next = fourth;
        fourth.next = fifth;
        fifth.next = six;
        six.next = seven;
        //构建循环链表,让最后一个结点指向第一个结点
        seven.next = first;
    }
}    
```



### 约瑟夫问题

1.构建含有41个结点的单向循环链表，分别存储1~41的值，分别代表这41个人；
2.使用计数器count，记录当前报数的值；
3.遍历链表，每循环一次，count++；
4.判断count的值，如果是3，则从链表中删除这个结点并打印结点的值，把count重置为0；

```java

public class JosephTest {
    public static void main(String[] args) {
        //解决约瑟夫问题

        //1.构建循环链表，包含41个结点，分别存储1~41之间的值
        //用来就首结点
        Node<Integer> first = null;
        //用来记录前一个结点
        Node<Integer> pre = null;

        for(int i = 1;i<=41;i++){

            //如果是第一个结点
            if (i==1){
                first = new Node<>(i,null);
                pre = first;
                continue;
            }

            //如果不是第一个结点
            Node<Integer> newNode = new Node<>(i, null);
            pre.next=newNode;
            pre=newNode;
            //如果是最后一个结点，那么需要让最后一个结点的下一个结点变为first,变为循环链表了
            if (i==41){
                pre.next=first;
            }

        }

        //2.需要count计数器，模拟报数
        int count=0;
        //3.遍历循环链表
        //记录每次遍历拿到的结点，默认从首结点开始
        Node<Integer> n = first;
        //记录当前结点的上一个结点
        Node<Integer> before = null;
        while(n!=n.next){
            //模拟报数

            count++;
            //判断当前报数是不是为3
            if (count==3){
                //如果是3，则把当前结点删除调用，打印当前结点，重置count=0，让当前结点n后移
                before.next=n.next;
                System.out.print(n.item+",");
                count=0;
                n=n.next;
            }else{
                //如果不是3，让before变为当前结点，让当前结点后移；
                before=n;
                n=n.next;
            }
        }

        //打印最后一个元素
        System.out.println(n.item);
    }


    //结点类
    private static class Node<T> {
        //存储数据
        T item;
        //下一个结点
        Node next;

        public Node(T item, Node next) {
            this.item = item;
            this.next = next;
        }
    }
}

```



## 栈

### 栈概述

​		栈是一种基于先进后出(FILO)的数据结构，是一种只能在一端进行插入和删除操作的特殊线性表。它按照先进后出的原则存储数据，先进入的数据被压入栈底，最后的数据在栈顶，需要读数据的时候从栈顶开始弹出数据（最后一个数据被第一个读出来）。

> 我们称数据进入到栈的动作为**压栈**，数据从栈中出去的动作为**弹栈**。



### 栈API设计

|   类名   |  Stack    |
| ---- | ---- |
| 构造方法 | Stack( )：创建Stack对象 |
| 成员方法 | 1.public boolean isEmpty()：判断栈是否为空，是返回true，否返回false<br/>2.public int size():获取栈中元素的个数<br/>3.public T pop():弹出栈顶元素<br/>4.public void push(T t)：向栈中压入元素t |
| 成员变量 | 1.private Node head:记录首结点<br/>2.private int N:当前栈的元素个数 |



### 栈代码实现

```java

import java.util.Iterator;

public class Stack<T> implements Iterable<T>{
    //记录首结点
    private Node head;
    //栈中元素的个数
    private int N;

    
    private class Node{
        public T item;
        public Node next;

        public Node(T item, Node next) {
            this.item = item;
            this.next = next;
        }
    }

    public Stack() {
        this.head = new Node(null,null);
        this.N=0;
    }

    //判断当前栈中元素个数是否为0
    public boolean isEmpty(){
        return N==0;
    }

    //获取栈中元素的个数
    public int size(){
        return N;
    }

    //把t元素压入栈
    public void push(T t){
        //找到首结点指向的第一个结点
        Node oldFirst = head.next;
        //创建新结点
        Node newNode = new Node(t, null);
        //让首结点指向新结点
        head.next = newNode;
        //让新结点指向原来的第一个结点
        newNode.next=oldFirst;
        //元素个数+1；
        N++;
    }

    //弹出栈顶元素
    public T pop(){
        //找到首结点指向的第一个结点
        Node oldFirst = head.next;
        if (oldFirst==null){
            return null;
        }
        //让首结点指向原来第一个结点的下一个结点
        head.next=oldFirst.next;
        //元素个数-1；
        N--;
        return oldFirst.item;
    }

    @Override
    public Iterator<T> iterator() {
        return new SIterator();
    }

    private class SIterator implements Iterator{
        private Node n;

        public SIterator(){
            this.n=head;
        }

        @Override
        public boolean hasNext() {
            return n.next!=null;
        }

        @Override
        public Object next() {
            n = n.next;
            return n.item;
        }
    }

}


public class StackTest {
    public static void main(String[] args) {
        //创建栈对象
        Stack<String> stack = new Stack<>();

        //测试压栈
        stack.push("a");
        stack.push("b");
        stack.push("c");
        stack.push("d");

        for (String item : stack) {
            System.out.println(item);
        }
        System.out.println("------------------------------");
        //测试弹栈
        String result = stack.pop();
        System.out.println("弹出的元素是："+result);
        System.out.println("剩余的元素个数："+stack.size());

    }
}
```



### 括号问题

问题描述：

```java
给定一个字符串，里边可能包含"()"小括号和其他字符，请编写程序检查该字符串的中的小括号是否成对出现。 
例如：
"(上海)(长安)"：正确匹配 
"上海((长安))"：正确匹配 
"上海(长安(北京)(深圳)南京)":正确匹配 
"上海(长安))"：错误匹配 
"((上海)长安"：错误匹配 
```

示例代码：

```java

public class BracketsMatchTest {
    public static void main(String[] args) {
        String str = "上海(长安)())";
        boolean match = isMatch(str);
        System.out.println(str+"中的括号是否匹配："+match);
    }

    /**
     * 判断str中的括号是否匹配
     * @param str 括号组成的字符串
     * @return 如果匹配，返回true，如果不匹配，返回false
     */
    public static boolean isMatch(String str){
        //1.创建栈对象，用来存储左括号
        Stack<String> chars = new Stack<>();
        //2.从左往右遍历字符串
        for (int i = 0; i < str.length(); i++) {
            String currChar = str.charAt(i)+ "";

            //3.判断当前字符是否为左括号，如果是，则把字符放入到栈中
            if (currChar.equals("(")){
                chars.push(currChar);
            //4.继续判断当前字符是否是右括号，如果不是，继续下一次循环
            }else if(currChar.equals(")")){
               
                //5.如果该字符是右括号，则从栈中弹出一个元素t；
                String t = chars.pop();
                //6.判断元素t是否为null，如果不是，则证明有对应的左括号，
                // 如果是，则证明没有对应的 左括号
                if (t==null){
                    return false;
                }
            }

        }
        //7.循环结束后，判断栈中还有没有剩余的左括号，如果有，则证明括号不匹配
        if (chars.size()==0){
            return true;
        }else{
            return false;
        }

    }
}

```



### 逆波兰表达式求值问题

**逆波兰表达式(后缀表达式)：**

| 中缀表达式 | 逆波兰表达式 |
| :--------: | :----------: |
|    a+b     |     ab+      |
|  a+(b-c)   |    abc-+     |
| a+(b-c)*d  |   abc-d*+    |
| a*(b-c)+d  |   abc-*d+    |

 

**需求：**

给定一个只包含加减乘除四种运算的逆波兰表达式的数组表示方式，求出该逆波兰表达式的结果。

```java

public class ReversePolishNotationTest {

    public static void main(String[] args) {
        //中缀表达式 3*（17-15）+18/6 的逆波兰表达式如下 6+3=9
        String[] notation = {"3", "17", "15", "-", "*", "18", "6", "/", "+"};
        int result = caculate(notation);
        System.out.println("逆波兰表达式的结果为：" + result);
    }

    /**
     * @param notaion 逆波兰表达式的数组表示方式
     * @return 逆波兰表达式的计算结果
     */
    public static int caculate(String[] notaion) {
        //1.定义一个栈，用来存储操作数
        Stack<Integer> oprands = new Stack<>();
        //2.从左往右遍历逆波兰表达式，得到每一个元素
        for (int i = 0; i < notaion.length; i++) {
            String curr = notaion[i];
            //3.判断当前元素是运算符还是操作数
            Integer o1;
            Integer o2;
            Integer result;
            switch (curr) {
                case "+":
                    //4.运算符，从栈中弹出两个操作数，完成运算，运算完的结果再压入栈中
                    o1 = oprands.pop();
                    o2 = oprands.pop();
                    result = o2 + o1;
                    oprands.push(result);
                    break;
                case "-":
                    //4.运算符，从栈中弹出两个操作数，完成运算，运算完的结果再压入栈中
                    o1 = oprands.pop();
                    o2 = oprands.pop();
                    result = o2 - o1;
                    oprands.push(result);
                    break;
                case "*":
                    //4.运算符，从栈中弹出两个操作数，完成运算，运算完的结果再压入栈中
                    o1 = oprands.pop();
                    o2 = oprands.pop();
                    result = o2 * o1;
                    oprands.push(result);
                    break;
                case "/":
                    //4.运算符，从栈中弹出两个操作数，完成运算，运算完的结果再压入栈中
                    o1 = oprands.pop();
                    o2 = oprands.pop();
                    result = o2 / o1;
                    oprands.push(result);

                    break;
                default:
                    //5.操作数，把该操作数放入到栈中；
                    oprands.push(Integer.parseInt(curr));
                    break;
            }

        }


        //6.得到栈中最后一个元素，就是逆波兰表达式的结果
        int result = oprands.pop();

        return result;
    }

}

```



## 队列

### 概述

​		队列是一种基于先进先出(FIFO)的数据结构，是一种只能在一端进行插入,在另一端进行删除操作的特殊线性表，它按照先进先出的原则存储数据，先进入的数据，在读取数据时先读被读出来。



### 队列API设计

| **类名** | Queue                                                        |
| :------: | ------------------------------------------------------------ |
| 构造方法 | Queue()：创建Queue对象                                       |
| 成员方法 | 1.public boolean isEmpty()：判断队列是否为空，是返回true，否返回false<br/>2.public int size():获取队列中元素的个数<br/>3.public T dequeue():从队列中拿出一个元素<br/>4.public void enqueue(T t)：往队列中插入一个元素 |
| 成员变量 | 1.private Node head:记录首结点<br/>2.private int N:当前栈的元素个数<br/>3.private Node last:记录最后一个结点 |

 

### 队列实现

```java

import java.util.Iterator;

public class Queue<T> implements Iterable<T>{
    //记录首结点
    private Node head;
    //记录最后一个结点
    private Node last;
    //记录队列中元素的个数
    private int N;


    private class Node{
        public T item;
        public Node next;

        public Node(T item, Node next) {
            this.item = item;
            this.next = next;
        }
    }
    public Queue() {
        this.head = new Node(null,null);
        this.last=null;
        this.N=0;
    }

    //判断队列是否为空
    public boolean isEmpty(){
        return N==0;
    }

    //返回队列中元素的个数
    public int size(){
        return N;
    }

    //向队列中插入元素t
    public void enqueue(T t){

        if (last==null){
            //当前尾结点last为null
            last= new Node(t,null);
            head.next=last;
        }else {
            //当前尾结点last不为null
            Node oldLast = last;
            last = new Node(t, null);
            oldLast.next=last;
        }

        //元素个数+1
        N++;
    }

    //从队列中拿出一个元素
    public T dequeue(){
        if (isEmpty()){
            return null;
        }

        Node oldFirst= head.next;
        head.next=oldFirst.next;
        N--;

        //因为出队列其实是在删除元素，因此如果队列中的元素被删除完了，需要重置last=null;

        if (isEmpty()){
            last=null;
        }
        return oldFirst.item;
    }


    @Override
    public Iterator<T> iterator() {
        return new QIterator();
    }

    private class QIterator implements Iterator{
        private Node n;

        public QIterator(){
            this.n=head;
        }
        @Override
        public boolean hasNext() {
            return n.next!=null;
        }

        @Override
        public Object next() {
            n = n.next;
            return n.item;
        }
    }

}

```



