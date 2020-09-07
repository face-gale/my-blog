# 二叉树入门



之前我们实现的符号表中，不难看出，符号表的增删查操作，**随着元素个数N的增多，其耗时也是线性增多的**，时  间复杂度都是O(n),为了提高运算效率，接下来我们学习树这种数据结构。



## 树的基本定义

树是由n（n>=1）个有限结点组成一个具有层次关系的集合。可以描述现实生活中的很多事物，例如家  谱、单位的组织架构、等等。

树具有以下特点：

- 每个结点有零个或多个子结点；

- 没有父结点的结点为根结点；

- 每一个非根结点只有一个父结点；

- 每个结点及其后代结点整体上可以看做是一棵树，称为当前结点的父结点的一个子树；



## 树的相关术语

- **结点的度：**

	一个结点含有的子树的个数称为该结点的度

- **叶结点:**

	度为0的结点称为叶结点，也可以叫做终端结点

- **分支节点：**

	度不为0的结点称为分支结点，也可以叫做非终端结点

- **结点的层次：**

	从根结点开始，根结点的层次为1，根的直接后继层次为2，以此类推

- **结点的层序编号：**

	将树中的结点按照从上层到下层，同层从左到右的次序排成一个线性序列，把他们编成连续的自然数。  

- **树的度：**

	树中所有结点的度的最大值

- **树的高度（深度）：**

	树中结点的最大层次

- **森林：**

	m（m>=0）个互不相交的树的集合，将一颗非空树的根结点删去，树就变成一个森林；给森林增加一个统一的根结点，森林就变成一棵树

- **孩子结点：**

	一个结点的直接后继结点称为该结点的孩子结点

- **双亲结点(父结点)：**

	一个结点的直接前驱称为该结点的双亲结点

- **兄弟结点：**

	同一双亲结点的孩子结点间互称兄弟结点


## 二叉树的基本定义

二叉树就是度不超过2的树(每个结点最多有两个子结点)

<img src="/data/binary-tree.png" style="zoom:80%;">

**满二叉树：**

一个二叉树，如果每一个层的结点树都达到最大值，则这个二叉树就是满二叉树。

**完全二叉树：**

叶结点只出现在最下层和次下层（倒数2层以上是满二叉树，**最下面一层先有左边结点**，后有右边结点）

<img src="/data/complete-binary-tree.png" style="zoom:80%;">



## 二叉查找树的创建

### 二叉树的结点类API设计

| 类名 | Node<Key,Value>                             |
| -------------- | ------------------------------------------------------------ |
| 构造方法       | Node(Key key, Value value, Node left, Node right)：创建Node对象 |
| 成员变量       | 1.public Node left:记录左子结点<br />2.public Node right:记录右子结点<br />3.public Key key:存储键<br />4.public Value value:存储值 |

代码实现：

```java
class Node {
    //存储键
    public Key key;
    //存储值
    private Value value;
    //记录左子结点
    public Node left;
    //记录右子结点
    public Node right;

    public Node(Key key, Value value, Node left, Node right) {
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
```



### 二叉查找树API设计

| 类名 | BinaryTree,Value value>  |
| -------------- | ------------------------------------------------------------ |
| 构造方法       | BinaryTree()：创建BinaryTree对象                             |
| 成员变量       | 1.private Node root:记录根结点2.private int N:记录树中元素的个数 |
| 成员方法       | 1. public void put(Key key,Value value):向树中插入一个键值对<br />2. private Node put(Node x, Key key, Value val)：给指定树x上，添加键一个键值对，并返回添加后的新树<br />3. public Value get(Key key):根据key，从树中找出对应的值<br />4. private Value get(Node x, Key key):从指定的树x中，找出key对应的值<br />5.public void delete(Key key):根据key，删除树中对应的键值对<br />6. private Node delete(Node x, Key key):删除指定树x上的键为key的键值对，并返回删除后的新树<br />7. public int size():获取树中元素的个数 |

**插入方法put实现思想：**

- 如果当前树中没有任何一个结点，则直接把新结点当做根结点使用
- 如果当前树不为空，则从根结点开始：
- 如果新结点的key小于当前结点的key，则继续找当前结点的左子结点；
- 如果新结点的key大于当前结点的key，则继续找当前结点的右子结点；
- 如果新结点的key等于当前结点的key，则树中已经存在这样的结点，替换该结点的value值即可。

**查询方法get实现思想：**

- 从根节点开始：
  - 如果要查询的key小于当前结点的key，则继续找当前结点的左子结点；
  - 如果要查询的key大于当前结点的key，则继续找当前结点的右子结点；
  - 如果要查询的key等于当前结点的key，则树中返回当前结点的value。

**删除方法delete实现思想：**

- 找到被删除结点；
- 找到被删除结点右子树中的最小结点minNode
- 删除右子树中的最小结点
- 让被删除结点的左子树称为最小结点minNode的左子树，让被删除结点的右子树称为最小结点minNode的右子树
- 让被删除结点的父节点指向最小结点minNode

**代码：**

```java
public class BinaryTree<Key extends Comparable<Key>, Value> {
    //记录根结点
    private Node root;
    //记录树中元素的个数
    private int N;

    private class Node {
        //存储键
        public Key key;
        //存储值
        private Value value;
        //记录左子结点
        public Node left;
        //记录右子结点
        public Node right;

        public Node(Key key, Value value, Node left, Node right) {
            this.key = key;
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }

    //获取树中元素的个数
    public int size() {
        return N;
    }

    //向树中添加元素key-value
    public void put(Key key, Value value) {
        root = put(root, key, value);
    }

    //向指定的树x中添加key-value,并返回添加元素后新的树
    private Node put(Node x, Key key, Value value) {
        //如果x子树为空，
        if (x==null){
            N++;
            return new Node(key,value, null,null);
        }

        //比较x结点的键和key的大小：
        int cmp = key.compareTo(x.key);
        if (cmp>0){
            //如果key大于x结点的键，则继续找x结点的右子树
            x.right = put(x.right,key,value);
        }else if(cmp<0){
            //如果key小于x结点的键，则继续找x结点的左子树
            x.left = put(x.left,key,value);
        }else{
            //如果key等于x结点的键，则替换x结点的值为value即可
            x.value = value;
        }
        return x;
    }

    //查询树中指定key对应的value
    public Value get(Key key) {
        return get(root,key);
    }

    //从指定的树x中，查找key对应的值
    public Value get(Node x, Key key) {
        //x树为null
        if (x==null){
            return null;
        }

        //比较key和x结点的键的大小
        int cmp = key.compareTo(x.key);
        if (cmp>0){
            //如果key大于x结点的键，则继续找x结点的右子树
            return get(x.right,key);
        }else if(cmp<0){
            //如果key小于x结点的键，则继续找x结点的左子树
            return get(x.left,key);
        }else{
            //如果key等于x结点的键，就找到了键为key的结点，只需要返回x结点的值即可
            return x.value;
        }
    }

    //删除树中key对应的value
    public void delete(Key key) {
        delete(root, key);
    }

    //删除指定树x中的key对应的value，并返回删除后的新树
    public Node delete(Node x, Key key) {
        //x树为null
        if (x==null){
            return null;
        }
        int cmp = key.compareTo(x.key);
        if (cmp>0){
            //如果key大于x结点的键，则继续找x结点的右子树
            x.right = delete(x.right,key);
        }else if(cmp<0){
            //如果key小于x结点的键，则继续找x结点的左子树
            x.left = delete(x.left,key);
        }else{
            //如果key等于x结点的键，完成真正的删除结点动作，要删除的结点就是x；
            //让元素个数-1
            N--;
            //得找到右子树中最小的结点
            if (x.right==null){
                return x.left;
            }
            if (x.left==null){
                return x.right;
            }
            
            Node minNode = x.right;
            while(minNode.left!=null){
                minNode = minNode.left;
            }

            //删除右子树中最小的结点
            Node n = x.right;
            while(n.left!=null){
                if (n.left.left==null){
                    n.left=null;
                }else{
                    //变换n结点即可
                    n = n.left;
                }
            }
            //让x结点的左子树成为minNode的左子树
            minNode.left = x.left;
            //让x结点的右子树成为minNode的右子树
            minNode.right = x.right;
            //让x结点的父结点指向minNode
            x = minNode;
        }
        return x;
    }
}

```



## 二叉查找树其他便捷方法



### 查找二叉树中最小的键

| public Key min()         | 找出树中最小的键                |
| ------------------------ | ------------------------------- |
| private Node min(Node x) | 找出指定树x中，最小键所在的结点 |

**代码：**

```java
	//查找整个树中最小的键
    public Key min(){
        return min(root).key;
    }

    //在指定树x中找出最小键所在的结点
    private Node min(Node x){
        //需要判断x还有没有左子结点，如果有，则继续向左找，如果没有，则x就是最小键所在的结点
        if (x.left!=null){
            return min(x.left);
        }else{
            return x;
        }
    }
```



### 查找二叉树中最大的键

| public Key max()        | 找出树中最大的键                |
| ----------------------- | ------------------------------- |
| public Node max(Node x) | 找出指定树x中，最大键所在的结点 |

**代码：**

```java
	//在整个树中找到最大的键
    public Key max(){
        return max(root).key;
    }

    //在指定的树x中，找到最大的键所在的结点
    public Node max(Node x){
        //判断x还有没有右子结点，如果有，则继续向右查找，如果没有，则x就是最大键所在的结点
        if (x.right!=null){
            return max(x.right);
        }else{
            return x;
        }
    }
```



## 二叉树的基础遍历

- 二叉树的三种遍历方式

  - 前序遍历

    先访问根结点，然后再访问左子树，最后访问右子树

  - 中序遍历

    先访问左子树，中间访问根节点，最后访问右子树

  - 后序遍历

    先访问左子树，再访问右子树，最后访问根节点

​           <img src="/data/binary-tree-forech.png" style="zoom:60%;" />



### 前序遍历

前序遍历的API：

`public Queue<Key> preErgodic()：使用前序遍历，获取整个树中的所有键 `
`private void preErgodic(Node x,Queue<Key> keys)：使用前序遍历，把指定树x中的所有键放入到keys队列中`

**实现步骤：**

- 把当前结点的key放入到队列中;
- 找到当前结点的左子树，如果不为空，递归遍历左子树
- 找到当前结点的右子树，如果不为空，递归遍历右子树

**代码**

```java
	//获取整个树中所有的键
    public Queue<Key> preErgodic(){
        Queue<Key> keys = new Queue<>();
        preErgodic(root, keys);
        return keys;
    }

    //获取指定树x的所有键，并放到keys队列中
    private void preErgodic(Node x,Queue<Key> keys){
        if (x==null){
            return;
        }

        //把x结点的key放入到keys中
        keys.enqueue(x.key);

        //递归遍历x结点的左子树
        if (x.left!=null){
            preErgodic(x.left,keys);
        }

        //递归遍历x结点的右子树
        if (x.right!=null){
            preErgodic(x.right,keys);
        }

    }
```



### 中序遍历

中序遍历的API：

`public Queue<Key> midErgodic()：使用中序遍历，获取整个树中的所有键 `
`private void midErgodic(Node x,Queue<Key> keys)：使用中序遍历，把指定树x中的所有键放入到keys队列中`

**实现步骤：**

- 找到当前结点的左子树，如果不为空，递归遍历左子树
- 把当前结点的key放入到队列中;
- 找到当前结点的右子树，如果不为空，递归遍历右子树

**代码**

```java
	//使用中序遍历获取树中所有的键
    public Queue<Key> midErgodic(){
        Queue<Key> keys = new Queue<>();
        midErgodic(root,keys);
        return keys;
    }

    //使用中序遍历，获取指定树x中所有的键，并存放到key中
    private void midErgodic(Node x,Queue<Key> keys){
        if (x==null){
            return;
        }
        //先递归，把左子树中的键放到keys中
        if (x.left!=null){
            midErgodic(x.left,keys);
        }
        //把当前结点x的键放到keys中
        keys.enqueue(x.key);
        //在递归，把右子树中的键放到keys中
        if(x.right!=null){
            midErgodic(x.right,keys);
        }

    }
```



### 后序遍历

后序遍历的API：

`public Queue<Key> afterErgodic()：使用后序遍历，获取整个树中的所有键 `
`private void afterErgodic(Node x,Queue<Key> keys)：使用后序遍历，把指定树x中的所有键放入keys队列中`

**实现步骤：**

- 找到当前结点的左子树，如果不为空，递归遍历左子树
- 找到当前结点的右子树，如果不为空，递归遍历右子树;
- 把当前结点的key放入到队列中; 

**代码**

```java
	//使用后序遍历，把整个树中所有的键返回
    public Queue<Key> afterErgodic(){
        Queue<Key> keys = new Queue<>();
        afterErgodic(root,keys);
        return keys;
    }

    //使用后序遍历，把指定树x中所有的键放入到keys中
    private void afterErgodic(Node x,Queue<Key> keys){
        if (x==null){
            return ;
        }

        //通过递归把左子树中所有的键放入到keys中
        if (x.left!=null){
            afterErgodic(x.left,keys);
        }
        //通过递归把右子树中所有的键放入到keys中
        if (x.right!=null){
            afterErgodic(x.right,keys);
        }
        //把x结点的键放入到keys中
        keys.enqueue(x.key);
    }
```



## 二叉树的层序遍历

所谓的层序遍历，就是从根节点（第一层）开始，依次向下，获取每一层所有结点的值

层序遍历的API：
`public Queue<Key> layerErgodic()：使用层序遍历，获取整个树中的所有键`

**实现步骤：**

- 创建队列，存储每一层的结点；
- 使用循环从队列中弹出一个结点：
  - 获取当前结点的key；
  - 如果当前结点的左子结点不为空，则把左子结点放入到队列中
  - 如果当前结点的右子结点不为空，则把右子结点放入到队列中

**代码**

```java
	//使用层序遍历，获取整个树中所有的键
    public Queue<Key> layerErgodic(){
        //定义两个队列，分别存储树中的键和树中的结点
        Queue<Key> keys = new Queue<>();
        Queue<Node> nodes = new Queue<>();

        //默认，往队列中放入根结点
        nodes.enqueue(root);

        while(!nodes.isEmpty()){
            //从队列中弹出一个结点，把key放入到keys中
            Node n = nodes.dequeue();
            keys.enqueue(n.key);
            //判断当前结点还有没有左子结点，如果有，则放入到nodes中
            if (n.left!=null){
                nodes.enqueue(n.left);
            }
            //判断当前结点还有没有右子结点，如果有，则放入到nodes中
            if (n.right!=null){
                nodes.enqueue(n.right);
            }
        }
        return keys;
    }
```



## 二叉树的最大深度问题

求最大深度API：
`public int maxDepth()：计算整个树的最大深度 `
`private int maxDepth(Node x):计算指定树x的最大深度`

**实现步骤：**

- 如果根结点为空，则最大深度为0；
- 计算左子树的最大深度；
- 计算右子树的最大深度；
- 当前树的最大深度=左子树的最大深度和右子树的最大深度中的较大者+1

**代码：**

```java
	//获取整个树的最大深度
    public int maxDepth(){
        return maxDepth(root);
    }
    //获取指定树x的最大深度
    private int maxDepth(Node x){
        if (x==null){
            return 0;
        }
        //x的最大深度
        int max=0;
        //左子树的最大深度
        int maxL=0;
        //右子树的最大深度
        int maxR=0;

        //计算x结点左子树的最大深度
        if (x.left!=null){
            maxL = maxDepth(x.left);
        }
        //计算x结点右子树的最大深度
        if (x.right!=null){
            maxR = maxDepth(x.right);
        }
        //比较左子树最大深度和右子树最大深度，取较大值+1即可
        max = maxL>maxR?maxL+1:maxR+1;
        return max;
    }
```



## 折纸问题

这棵树有这样的特点：
- 根结点为下折痕（down）；
- 每一个结点的左子结点为下折痕（down）；
- 每一个结点的右子结点为上折痕（up）；

<img src="/data/zhezhi.png" style="zoom:60%;">

**实现步骤：**

- 定义结点类
- 构建深度为N的折痕树；
- 使用中序遍历，打印出树中所有结点的内容；

**构建深度为N的折痕树：**

- 第一次对折，只有一条折痕，创建根结点；
- 如果不是第一次对折，则使用队列保存根结点；
- 循环遍历队列：
  - 从队列中拿出一个结点；
  - 如果这个结点的左子结点不为空，则把这个左子结点添加到队列中；
  - 如果这个结点的右子结点不为空，则把这个右子结点添加到队列中；
  - 判断当前结点的左子结点和右子结点都不为空，如果是，则需要为当前结点创建一个值为down的左子结点，一个值为up的右子结点。

**代码：**

```java
public class PagerFoldingTest {

    public static void main(String[] args) {
        //模拟这只过程，产生树
        Node<String> tree = createTree(2);
        //遍历树，打印每个结点
        printTree(tree);
    }

    //通过模拟对折N次纸，产生树
    public static Node<String> createTree(int N){
        //定义根结点
        Node<String> root=null;
        for (int i = 0; i < N; i++) {

            //1.当前是第一次对折
            if (i==0){
                root = new Node<>("down",null,null);
                continue;
            }
            //2.当前不是第一次对折
            //定义一个辅助队列，通过层序遍历的思想，找到叶子结点，叶子结点添加子节点
            Queue<Node> queue = new Queue<>();
            queue.enqueue(root);

            //循环遍历队列
            while(!queue.isEmpty()){
                //从队列中弹出一个结点
                Node<String> tmp = queue.dequeue();
                //如果有左子结点，则把左子结点放入到队列中
                if (tmp.left!=null){
                    queue.enqueue(tmp.left);
                }
                //如果有右子结点，则把右子结点放入到队列中
                if (tmp.right!=null){
                    queue.enqueue(tmp.right);
                }
                //如果同时没有左子结点和右子结点，那么证明该节点是叶子结点，只需要给该节点添加左子结点和右子结点即可
                if (tmp.left==null && tmp.right==null){
                    tmp.left = new Node<String>("down", null,null);
                    tmp.right = new Node<String>("up",null,null);
                }
            }
        }
        return root;
    }

    //打印树中每个结点到控制台
    public static void printTree(Node<String> root){
        //需要使用中序遍历完成
        if (root==null){
            return;
        }
        //打印左子树的每个结点
        if (root.left!=null){
            printTree(root.left);
        }
        //打印当前结点
        System.out.print(root.item+" ");
        //打印右子树的每个结点
        if (root.right!=null){
            printTree(root.right);
        }
    }

    //结点类
    private static class Node<T>{
        public T item;//存储元素
        public Node left;
        public Node right;

        public Node(T item, Node left, Node right) {
            this.item = item;
            this.left = left;
            this.right = right;
        }
    }
}
```

