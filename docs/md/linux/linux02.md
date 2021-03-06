---
title: "Linux 目录管理"
date: 2019-11-2 14:17:57
---
# Linux 目录管理
## 目录结构
<div align="center">
<img src="http://ww1.sinaimg.cn/large/007Rnr4nly1g8jooojbngj30r205kjrk.jpg">
</div>

| 目录   | 说明                                        |
|------|-------------------------------------------|
| bin  | 存放二进制可执行文件\(ls, cat, mkdir 等\)            |
| boot | 存放用于系统引导时使用的各种文件                          |
| dev  | 用于存放设备文件                                  |
| etc  | 存放系统配置文件                                  |
| home | 存放所有用户文件的根目录                              |
| lib  | 存放跟文件系统中的程序运行所需要的共享库及内核模块                 |
| mnt  | 系统管理员安装临时文件系统的安装点                         |
| opt  | 额外安装的可选应用程序包所放置的位置                        |
| proc | 虚拟文件系统，存放当前内存的映射                          |
| root | 超级用户目录                                    |
| sbin | 存放二进制可执行文件，只有 root 才能访问                   |
| tmp  | 用于存放各种临时文件                                |
| usr  | 用于存放系统应用程序，比较重要的目录 /usr/local 本地管理员软件安装目录 |
| var  | 用于存放运行时需要改变数据的文件                          |

## 操作文件目录
<div align="center">
<img src="http://ww1.sinaimg.cn/large/007Rnr4nly1g8jov1ytzyj30u00owmye.jpg">
</div>

## 压缩解压缩
### tar
| 命令   | 语法                               | 参数 | 参数说明 |
|------|----------------------------------|----|------|
| tar  | tar \[\-cxzjvf\] 压缩打包文档的名称 欲打包目录 |
||| \-c  | 建立一个归档文件的参数指令                    |
||| \-x  | 解开一个归档文件的参数指令                    |
||| \-z  | 是否需要用 gzip 压缩                    |
||| \-j  | 是否需要用 bzip2 压缩                   |
||| \-v  | 压缩的过程中显示文件                       |
||| \-f  | 使用档名，在 f 之后要立即接档名                |
||| \-tf | 查看归档文件里面的文件                      |

::: tip 解压缩
- 压缩文件夹：`tar -zcvf test.tar.gz test\`
- 解压文件夹：`tar -zxvf test.tar.gz`
:::

### gzip
| 命令    | 语法                                                                             | 参数 | 参数说明 |
|-------|--------------------------------------------------------------------------------|----|------|
| gzip  | gzip \[选项\] 压缩（解压缩）的文件名                                                        |||
||| \-d   | 解压缩                                                                            |
||| \-l   | 对每个压缩文件，显示压缩文件的大小，未压缩文件的大小，压缩比，未压缩文件的名字                                        |
||| \-v   | 对每一个压缩和解压的文件，显示文件名和压缩比                                                         |
||| \-num | 用指定的数字num调整压缩的速度，\-1或\-\-fast表示最快压缩方法（低压缩比），\-9或\-\-best表示最慢压缩方法（高压缩比）。系统缺省值为6 |

压缩文件后缀为 gz

### bzip2
| 命令    | 语法                                                                             | 参数 | 参数说明 |
|-------|--------------------------------------------------------------------------------|----|------|
| bzip2 | bzip2 \[\-cdz\]                                                                |||
||| \-d   | 解压缩                                                                            |
||| \-z   | 压缩参数                                                                           |
||| \-num | 用指定的数字num调整压缩的速度，\-1或\-\-fast表示最快压缩方法（低压缩比），\-9或\-\-best表示最慢压缩方法（高压缩比）。系统缺省值为6 |


压缩文件后缀为 bz2