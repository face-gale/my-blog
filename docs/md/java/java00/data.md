---
title: "Java 数据结构" 
date: 2019年11月1日15:48:28
---
# 数据结构
::: tip 常见的数据结构
数据存储的常用结构有：栈、队列、数组、链表和红黑树。
:::
## 栈
栈(stack)：又称堆栈，它是运算受限的线性表，其限制是仅允许在标的一端进行插入和删除操作，不允许在其他任何位置进行添加、查找、删除等操作。
::: tip 栈对元素的存取有如下的特点
* 先进后出（即，存进去的元素，要在后它后面的元素依次取出后，才能取出该元素）。例如，子弹压进弹夹，先压进去的子弹在下面，后压进去的子弹在上面，当开枪时，先弹出上面的子弹，然后才能弹出下面的子弹。
* 栈的入口、出口的都是栈的顶端位置。
:::
这里两个名词需要注意：
* 压栈：就是存元素。即，把元素存储到栈的顶端位置，栈中已有元素依次向栈底方向移动一个位置。
* 弹栈：就是取元素。即，把栈的顶端位置元素取出，栈中已有元素依次向栈顶方向移动一个位置。
## 队列
队列(queue)：简称队，它同堆栈一样，也是一种运算受限的线性表，其限制是仅允许在表的一端进行插入，而在表的另一端进行删除。
::: tip 对元素的存取有如下的特点：
* 先进先出（即，存进去的元素，要在后它前面的元素依次取出后，才能取出该元素）。例如，小火车过山洞，车头先进去，车尾后进去；车头先出来，车尾后出来。
* 队列的入口、出口各占一侧。
:::

## 数组

数组(Array):是有序的元素序列，数组是在内存中开辟一段连续的空间，并在此空间存放元素,地址是连续的。
::: tip 对元素的存取有如下的特点：
*  查找快：通过索引，可以快速访问指定位置的元素。
*  增删慢：指定索引位置增加或者删除元素需要创建一个新数组，将指定新元素存储在指定索引位置，再把原数组元素根据索引，复制到新数组对应索引的位置。
:::

##  链表
链表(linked list):由一系列结点node（链表中每一个元素称为结点）组成，结点可以在运行时动态生成。每个结点包括两个部分：一个是存储数据元素的数据域，另一个是存储下一个结点地址的指针域。我们常说的链表结构有单向链表与双向链表。

::: tip 对元素的存取有如下的特点：
* 多个结点之间，通过地址进行连接。
* 查找元素慢：想查找某个元素，需要通过连接的节点，依次向后查找指定元素
* 增删元素快：增加或删除元素只需要修改连接下个元素的地址即可。
:::

## 红黑树
::: tip 相关概念：
- 二叉树(binary tree)是每个结点不超过2的有序树(tree)。顶上的叫根结点，两边被称作“左子树”和“右子树”。
- 二叉查找树:在二叉树的基础上，元素大小有大小顺序，左子树小，右子树大。
- 平衡树：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1
:::
二叉树的一种比较有意思的叫做红黑树，红黑树本身就是一颗二叉查找树，将节点插入后，该树仍然是一颗二叉查找树。也就意味着，树的键值仍然是有序的。
::: tip 红黑树的约束:
1. 节点可以是红色的或者黑色的
2. 根节点是黑色的
3. 叶子节点(特指空节点)是黑色的
4. 每个红色节点的子节点都是黑色的
5. 任何一个节点到其每一个叶子节点的所有路径上黑色节点数相同
:::
红黑树的特点:查询速度特别快,趋近平衡树,查找叶子元素最少和最多次数不多于二倍