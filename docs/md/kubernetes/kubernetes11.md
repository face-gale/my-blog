---
title: "Nginx Ingress Controller"
date: 2019年11月4日15:52:51
---
# Nginx Ingress Controller
## 概述
本次实践的主要目的就是将入口统一，不再通过 LoadBalancer 等方式将端口暴露出来，而是使用 Ingress 提供的反向代理负载均衡功能作为我们的唯一入口。通过以下步骤操作仔细体会。

注意： 下面包含资源配置的步骤都是自行创建 YAML 配置文件通过 `kubectl create -f <YAML>` 或 `kubectl apply -f <YAML>` 部署，`kubectl delete -f <YAML>` 删除

## 安装 Ingress
Ingress Controller 有许多种，我们选择最熟悉的 Nginx 来处理请求，其它可以参考 官方文档

- 下载 Nginx Ingress Controller 配置文件

```
mkdir ingress
 
wget https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.30.0/deploy/static/mandatory.yaml
 
# 上面可能无法下载：所以用国内的 gitee

wget https://gitee.com/mirrors/ingress-nginx/raw/nginx-0.30.0/deploy/static/mandatory.yaml
```



修改配置文件，找到配置如下位置 (搜索 serviceAccountName) 在下面增加一句 hostNetwork: true

更换阿里镜像 

`registry.aliyuncs.com/google_containers/nginx-ingress-controller:0.30.0`

或

`registry.cn-hangzhou.aliyuncs.com/google_containers/nginx-ingress-controller:0.30.0`

把文件中所有的 **v1beta1** 修改为 **v1** ，因为 v1beta1 在 V1.17 之后就不推荐使用了，在V1.22之后将不可用

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-ingress-controller
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
spec:
  # 可以部署多个实例
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: ingress-nginx
      app.kubernetes.io/part-of: ingress-nginx
  template:
    metadata:
      labels:
        app.kubernetes.io/name: ingress-nginx
        app.kubernetes.io/part-of: ingress-nginx
      annotations:
        prometheus.io/port: "10254"
        prometheus.io/scrape: "true"
    spec:
      serviceAccountName: nginx-ingress-serviceaccount
      # 增加 hostNetwork: true，意思是开启主机网络模式，暴露 Nginx 服务端口 80
      hostNetwork: true
      containers:
        - name: nginx-ingress-controller
          # 使用 Azure 中国镜像
          image: quay.azk8s.cn/kubernetes-ingress-controller/nginx-ingress-controller:0.25.0
          args:
            - /nginx-ingress-controller
            - --configmap=$(POD_NAMESPACE)/nginx-configuration
            - --tcp-services-configmap=$(POD_NAMESPACE)/tcp-services
            - --udp-services-configmap=$(POD_NAMESPACE)/udp-services
            - --publish-service=$(POD_NAMESPACE)/ingress-nginx
// 以下代码省略...
```
- 通过命令 kubectl apply -f mandatory.yaml 部署
- 通过命令 kubectl get pods -n ingress-nginx -o wide 查看

## 部署 Ingress
- 创建一个名为 ingress.yml 的资源配置文件
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-web
  annotations:
    # 指定 Ingress Controller 的类型
    kubernetes.io/ingress.class: "nginx"
    # 指定我们的 rules 的 path 可以使用正则表达式
    nginx.ingress.kubernetes.io/use-regex: "true"
    # 连接超时时间，默认为 5s
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "600"
    # 后端服务器回转数据超时时间，默认为 60s
    nginx.ingress.kubernetes.io/proxy-send-timeout: "600"
    # 后端服务器响应超时时间，默认为 60s
    nginx.ingress.kubernetes.io/proxy-read-timeout: "600"
    # 客户端上传文件，最大大小，默认为 20m
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    # URL 重写
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  # 路由规则
  rules:
  # 主机名，只能是域名，修改为你自己的
  - host: k8s.aodiv.com
    http:
      paths:
      - pathType: Prefix
        path: /
        backend:
          service:
            name: tomcat-http
            port:
              number: 8080
          # 后台部署的 Service Name
          # serviceName: tomcat-http
          # 后台部署的 Service Port
          # servicePort: 8080
```
- 通过命令 kubectl apply -f ingress.yml 部署
- 通过命令 kubectl get ingress 查看

## 部署 Tomcat
部署 Tomcat 但仅允许在内网访问，我们要通过 Ingress 提供的反向代理功能路由到 Tomcat 之上，创建一个名为 tomcat.yml 资源配置文件
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tomcat-app
spec:
  replicas: 2
  selector:
    matchLabels:
      name: tomcat
  template:
    metadata:
      labels:
        name: tomcat
    spec:
      containers:
      - name: tomcat
        image: tomcat:8.5.43
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: tomcat-http
spec:
  ports:
    - port: 8080
      targetPort: 8080
  # ClusterIP, NodePort, LoadBalancer
  type: ClusterIP
  selector:
    name: tomcat
```
- 通过命令 `kubectl apply -f tomcat.yml` 部署

## 验证是否成功
### 查看 Tomcat
```
kubectl get deployment
# 输出如下
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
tomcat-app   2/2     2            2           88m
```
```
kubectl get service
# 输出如下
NAME          TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
kubernetes    ClusterIP   10.96.0.1       <none>        443/TCP    2d5h
tomcat-http   ClusterIP   10.97.222.179   <none>        8080/TCP   89m
```
### 查看 Ingress
```
kubectl get pods -n ingress-nginx -o wide
# 输出如下，注意下面的 IP 地址，就是我们实际访问地址
NAME                                        READY   STATUS    RESTARTS   AGE   IP                NODE                 NOMINATED NODE   READINESS GATES
nginx-ingress-controller-76f9fddcf8-vzkm5   1/1     Running   0          61m   192.168.141.121   kubernetes-node-02   <none>           <none>
```

```
kubectl get ingress
# 输出如下
NAME        HOSTS          ADDRESS   PORTS   AGE
nginx-web   k8s.funtl.com             80      61m
```
### 测试访问
成功代理到 Tomcat 即表示成功
```
# 不设置 Hosts 的方式请求地址，下面的 IP 和 HOST 均在上面有配置
curl -v http://192.168.141.121 -H 'host: k8s.funtl.com'
```