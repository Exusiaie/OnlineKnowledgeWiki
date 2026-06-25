---
title: Kubernetes
category: DevOps
tags: [devops, kubernetes, 容器编排]
order: 2
icon: ☸
---

# Kubernetes 容器编排平台教程

## 概述

Kubernetes（简称 K8s）是 Google 开源的容器编排平台，用于自动化部署、扩展和管理容器化应用。它起源于 Google 内部的 Borg 系统，现已成为云原生计算基金会（CNCF）的毕业项目，是云原生架构的事实标准。

Kubernetes 解决的核心问题：在成百上千台服务器上，如何高效地调度容器、处理故障、实现伸缩和滚动更新。

## 核心概念

### 集群架构

Kubernetes 集群包含两类节点：

- **Master 节点（Control Plane）**：负责集群管理，包括 API Server、Scheduler、Controller Manager、etcd
- **Worker 节点**：运行实际的应用容器，包含 kubelet、kube-proxy、Container Runtime

### 核心资源对象

| 资源 | 说明 |
|------|------|
| Pod | 最小的部署单元，包含一个或多个容器 |
| Service | 为 Pod 提供稳定的网络访问入口 |
| Deployment | 管理 Pod 的副本数量和更新策略 |
| ConfigMap | 非敏感配置数据 |
| Secret | 敏感数据（密码、token 等） |
| Ingress | HTTP/HTTPS 路由规则 |
| Namespace | 资源隔离的虚拟集群 |

## 快速部署（Minikube）

```bash
# 安装 Minikube
brew install minikube

# 启动本地集群
minikube start --cpus=4 --memory=8192

# 查看状态
kubectl cluster-info
kubectl get nodes
```

## Deployment 示例

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: app
          image: nginx:1.25-alpine
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: "64Mi"
              cpu: "100m"
            limits:
              memory: "128Mi"
              cpu: "200m"
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /health
              port: 80
            initialDelaySeconds: 15
            periodSeconds: 20
```

```bash
# 应用配置
kubectl apply -f deployment.yaml

# 查看
kubectl get deployments
kubectl get pods
kubectl describe pod myapp-deployment-xxxxx

# 查看日志
kubectl logs -l app=myapp
kubectl logs -f myapp-deployment-xxxxx

# 在容器中执行命令
kubectl exec -it myapp-deployment-xxxxx -- sh

# 扩缩容
kubectl scale deployment myapp-deployment --replicas=5

# 滚动更新
kubectl set image deployment/myapp-deployment app=nginx:1.26-alpine
kubectl rollout status deployment/myapp-deployment

# 回滚
kubectl rollout undo deployment/myapp-deployment

# 删除
kubectl delete -f deployment.yaml
```

## Service 示例

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: ClusterIP  # ClusterIP / NodePort / LoadBalancer
  selector:
    app: myapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

```bash
kubectl apply -f service.yaml
kubectl get services

# 端口转发（本地访问）
kubectl port-forward service/myapp-service 8080:80
```

## ConfigMap 与 Secret

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  LOG_LEVEL: info
  database_url: "postgresql://db:5432/mydb"

---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQxMjM=   # base64 编码的 "password123"
  API_KEY: c2VjcmV0LWtleQ==
```

在 Deployment 中使用：

```yaml
spec:
  containers:
    - name: app
      image: myapp:v1
      envFrom:
        - configMapRef:
            name: app-config
      env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secret
              key: DB_PASSWORD
```

## Ingress 示例

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp-service
                port:
                  number: 80
```

## 常用 kubectl 命令

```bash
# 资源管理
kubectl get pods,services,deployments,ingress
kubectl get all -n <namespace>
kubectl explain pod.spec.containers

# 调试
kubectl describe pod <pod-name>
kubectl logs <pod-name> -c <container-name>
kubectl exec -it <pod-name> -- /bin/bash

# 扩缩容
kubectl scale deployment <name> --replicas=3

# 更新与回滚
kubectl set image deployment/<name> <container>=<image>:<tag>
kubectl rollout history deployment/<name>
kubectl rollout undo deployment/<name> --to-revision=2
```

## 核心功能

- **Pod**：最小的调度单位，共享网络和存储的一组容器
- **Service**：稳定的虚拟 IP 和 DNS 名称，负载均衡
- **Deployment**：声明式更新，滚动发布和回滚
- **ConfigMap**：配置与代码分离
- **Ingress**：七层负载均衡和 SSL 终止
- **Horizontal Pod Autoscaler（HPA）**：根据 CPU/内存自动扩缩容
- **Helm**：Kubernetes 包管理器，模板化部署
- **PersistentVolume（PV）**：持久化存储抽象

## 总结

Kubernetes 是云原生时代的操作系统。虽然学习曲线较陡，但它带来的自动化部署、弹性伸缩和自愈能力，使其成为大规模微服务架构的首选平台。从 Docker Compose 的单机编排到 Kubernetes 的集群编排，是每个 DevOps 工程师的必经之路。
