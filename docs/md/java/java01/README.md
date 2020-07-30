---
title: "Java 继承" 
date: 2019年11月13日10:27:35
---
# 继承
多个类中存在相同属性和行为时，将这些内容抽取到单独一个类中，那么多个类无需再定义这些属性和行为，只要继承那一个类即可。子类具有与父类相同的属性和行为。子类可以直接访问父类中的非私有的属性和行为。
Java类只支持单继承，不支持多继承但支持多层继承。顶层父类是Object类。所有的类默认继承Object，作为父类。

## 成员变量重名
子父类中出现了同名的成员变量时，在子类中需要访问父类中非私有成员变量时，需要使用super关键字，修饰父类成员变量，类似于之前学的this。

::: tip 当以下三者重名时：
- 局部变量：直接写成员变量名。
- 本类的成员变量：this.成员变量名。
- 父类的成员变量：super.成员变量名。
:::

<div align="center">
<img src="http://ww1.sinaimg.cn/large/007Rnr4nly1g8heictm7ej30ji08j0wi.jpg">
</div>

直接通过子类对象访问成员变量：等号左边是谁，就优先用谁，没有则向上找。间接通过成员方法访问成员变量：该方法属于谁，就优先用谁，没有则向上找。

<div align="center">
<img src="http://ww1.sinaimg.cn/large/007Rnr4nly1g8heect6nlj30pv0h9tit.jpg">
</div>

## 构造方法

::: tip 继承关系中,父子类构造方法的访问特点：
- 子类构造方法中有一个默认隐含的`super()`调用，所以一定是先调用父类构造，后执行子类构造。
- 子类构造可以通过super关键字来调用父类重载构造。
- super的父类构造调用，必须是子类构造方法的第一个语句,不能一个子类构造调用多次super构造。
总结：子类必须调用父类构造方法,不写则赠送super();写了则用写的指定的super调用，super只能有一个，还必须是第一个。
:::

## super关键字的用法
::: tip 三种用法：
- 在子类的成员方法中，访问父类的成员变量。
- 在子类的成员方法中，访问父类的成员方法。
- 在子类的构造方法中，访问父类的构造方法。
:::

## this关键字的用法
::: tip 三种用法：
- 在本类的成员方法中，访问本类的成员变量。
- 在本类的成员方法中，访问本类的另一个成员方法。
- 在本类的构造方法中，访问本类的另一个构造方法。
总结：this()构造方法调用必须是构造方法的第一个语句，唯一一个。所以super和this两种构造调用，不能同时使用。
:::

## 继承方法调用内存图
<div align="center">
<img src="http://ww1.sinaimg.cn/large/007Rnr4nly1g8hfpf6ts6j31ca0j1dwo.jpg">
</div>