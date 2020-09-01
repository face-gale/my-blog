# 符号表

符号表最主要的目的就是将一个键和一个值联系起来，符号表能够将存储的数据元素是一个键和一个值共同组成的键值对数据，我们可以根据键来查找对应的值。

符号表中，键具有唯一性。

符号表在实际生活中的使用场景是非常广泛的，见下表：

|   应用   |         查找目的         |   键   |    值    |
| :------: | :----------------------: | :----: | :------: |
|   字典   |      找出单词的释义      |  单词  |   释义   |
| 图书索引 |  找出某个术语相关的页码  |  术语  | 一串页码 |
| 网络搜索 | 找出某个关键字对应的网页 | 关键字 | 网页名称 |



## 符号表API设计

**结点类：**

| 类名     | Node<Key,Value>                                              |
| -------- | ------------------------------------------------------------ |
| 构造方法 | Node(Key key,Value value,Node next)：创建Node对象            |
| 成员变量 | 1.public Key key:存储键<br/>2.public Value value:存储值<br/>3.public Node next:存储下一个结点 |

**符号表：**

| 类名     | SymbolTable<Key,Value>                                       |
| -------- | ------------------------------------------------------------ |
| 构造方法 | SymbolTable()：创建SymbolTable对象                           |
| 成员方法 | 1.public Value get(Key key)：根据键key，找对应的值<br/>2.public void put(Key key,Value val):向符号表中插入一个键值对<br/>3.public void delete(Key key):删除键为key的键值对<br/>4.public int size()：获取符号表的大小 |
| 成员变量 | 1.private Node head:记录首结点<br/>2.private int N:记录符号表中键值对的个数 |



## 无序符号表

```java

public class SymbolTable<Key,Value> {
    //记录首结点
    private Node head;
    //记录符号表中元素的个数
    private int N;

    private class Node{
        //键
        public Key key;
        //值
        public Value value;
        //下一个结点
        public Node next;

        public Node(Key key, Value value, Node next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }

    public SymbolTable() {
        this.head = new Node(null,null,null);
        this.N=0;
    }

    //获取符号表中键值对的个数
    public int size(){
        return N;
    }

    //往符号表中插入键值对
    public void put(Key key,Value value){
        //符号表中已经存在了键为key的键值对，那么只需要找到该结点，替换值为value即可
        Node n = head;
        while(n.next!=null){
            //变换n
            n = n.next;
            //判断n结点存储的键是否为key，如果是，则替换n结点的值
            if (n.key.equals(key)){
                n.value = value;
                return;
            }

        }

        //如果符号表中不存在键为key的键值对，只需要创建新的结点，保存要插入的键值对，
        // 把新结点插入到链表的头部  head.next=新结点即可
        Node newNode = new Node(key, value, null);
        Node oldFirst = head.next;
        newNode.next = oldFirst;
        head.next = newNode;

        //元素个数+1；
        N++;

    }
    //删除符号表中键为key的键值对
    public void delete(Key key){
        //找到键为key的结点，把该结点从链表中删除

        Node n = head;
        while(n.next!=null){
            //判断n结点的下一个结点的键是否为key，如果是，就删除该结点
            if (n.next.key.equals(key)){
                n.next = n.next.next;
                N--;
                return;
            }

            //变换n
            n = n.next;
        }
    }

    //从符号表中获取key对应的值
    public Value get(Key key){
        //找到键为key的结点
        Node n = head;
        while(n.next!=null){
            //变换n
            n = n.next;
            if (n.key.equals(key)){
                return n.value;
            }
        }
        return null;
    }

}
```



## 有序符号表

```java

public class OrderSymbolTable<Key extends Comparable<Key>,Value> {
    //记录首结点
    private Node head;
    //记录符号表中元素的个数
    private int N;

    private class Node{
        //键
        public Key key;
        //值
        public Value value;
        //下一个结点
        public Node next;

        public Node(Key key, Value value, Node next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }

    public OrderSymbolTable() {
        this.head = new Node(null,null,null);
        this.N=0;
    }

    //获取符号表中键值对的个数
    public int size(){
        return N;
    }

    //往符号表中插入键值对
    public void put(Key key,Value value){
        //定义两个Node变量，分别记录当前结点和当前结点的上一个结点

        Node curr = head.next;
        Node pre = head;
        while(curr!=null && key.compareTo(curr.key)>0){

            //变换当前结点和前一个结点即可
            pre = curr;
            curr = curr.next;
        }

        //如果当前结点curr的键和要插入的key一样，则替换
        if (curr!=null && key.compareTo(curr.key)==0){
            curr.value = value;
            return;
        }

        //如果当前结点curr的键和要插入的key不一样，把新的结点插入到curr之前
        Node newNode = new Node(key, value, curr);
        pre.next = newNode;

        //元素的个数+1；
        N++;

    }
    //删除符号表中键为key的键值对
    public void delete(Key key){
        //找到键为key的结点，把该结点从链表中删除

        Node n = head;
        while(n.next!=null){
            //判断n结点的下一个结点的键是否为key，如果是，就删除该结点
            if (n.next.key.equals(key)){
                n.next = n.next.next;
                N--;
                return;
            }

            //变换n
            n = n.next;
        }
    }

    //从符号表中获取key对应的值
    public Value get(Key key){
        //找到键为key的结点
        Node n = head;
        while(n.next!=null){
            //变换n
            n = n.next;
            if (n.key.equals(key)){
                return n.value;
            }
        }
        return null;
    }

}
```

