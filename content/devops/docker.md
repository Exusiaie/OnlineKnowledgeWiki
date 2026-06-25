---
title: Docker
category: DevOps
tags: [devops, docker, 容器化]
order: 1
icon: 🐳
---

# Docker 容器化平台教程

## 概述

Docker 是一个开源的容器化平台，它允许开发者将应用及其所有依赖打包到一个标准化的轻量级容器中。与虚拟机不同，Docker 容器共享宿主机的操作系统内核，因此启动速度极快（秒级 vs 分钟级），资源占用极少。Docker 彻底改变了软件的开发、交付和部署方式。

## Docker vs 虚拟机

| 特性 | Docker 容器 | 虚拟机 |
|------|------------|--------|
| 启动速度 | 秒级 | 分钟级 |
| 资源占用 | MB 级 | GB 级 |
| 性能 | 接近原生 | 有性能损耗 |
| 隔离性 | 进程级隔离 | 完全隔离 |
| 镜像大小 | 通常几十 MB | 几 GB |
| 系统资源 | 共享内核 | 每 VM 独立 OS |

## 安装

```bash
# macOS: 安装 Docker Desktop
brew install --cask docker

# Ubuntu
sudo apt install docker.io
sudo systemctl start docker
sudo usermod -aG docker $USER  # 免 sudo

# 验证安装
docker --version
docker run hello-world
```

## 核心概念

- **镜像（Image）**：只读模板，包含运行应用所需的一切
- **容器（Container）**：镜像的运行实例
- **Dockerfile**：构建镜像的脚本
- **仓库（Registry）**：存储和分发镜像的地方（Docker Hub）
- **卷（Volume）**：持久化数据存储
- **网络（Network）**：容器间通信

## 常用命令

```bash
# 镜像管理
docker pull nginx:latest              # 拉取镜像
docker images                          # 查看本地镜像
docker rmi nginx:latest                # 删除镜像
docker build -t myapp:v1 .             # 构建镜像

# 容器管理
docker run -d -p 8080:80 --name web nginx  # 运行容器
docker ps                              # 查看运行中的容器
docker ps -a                           # 查看所有容器
docker stop web                        # 停止容器
docker start web                       # 启动容器
docker restart web                     # 重启容器
docker rm web                          # 删除容器
docker rm -f web                       # 强制删除运行中的容器

# 容器交互
docker logs web                        # 查看日志
docker logs -f web                     # 实时跟踪日志
docker exec -it web bash               # 进入容器终端

# 清理
docker system prune -a                 # 清理所有未使用的资源
```

## Dockerfile

Dockerfile 是构建 Docker 镜像的蓝图：

```dockerfile
# 基础镜像
FROM python:3.12-slim

# 设置工作目录
WORKDIR /app

# 复制依赖文件（先复制 requirements 可以利用缓存）
COPY requirements.txt .

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 8000

# 设置环境变量
ENV PYTHONUNBUFFERED=1

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8000/health || exit 1

# 启动命令
CMD ["python", "app.py"]
```

```bash
# 构建镜像
docker build -t myapp:v1 .

# 运行容器
docker run -d \
    --name myapp \
    -p 8000:8000 \
    -v $(pwd)/data:/app/data \
    -e DATABASE_URL=postgresql://... \
    myapp:v1
```

## Docker Compose

Docker Compose 用于定义和运行多容器应用：

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    container_name: myapp
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    volumes:
      - ./app:/app
      - static_volume:/app/static
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    container_name: postgres
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine
    container_name: redis
    volumes:
      - redis_data:/data

  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - static_volume:/static
    depends_on:
      - app

volumes:
  postgres_data:
  redis_data:
  static_volume:
```

## 核心功能

- **镜像**：分层构建，写时复制，高效的存储和分发
- **容器**：标准化的运行环境，隔离的进程空间
- **Dockerfile**：声明式构建，版本控制和自动化
- **Docker Compose**：多容器应用编排，一键启动整个环境
- **卷挂载**：持久化数据，宿主机与容器共享文件
- **网络**：bridge、host、overlay 等多种网络模式
- **多阶段构建**：减小镜像体积，分离构建和运行环境
- **健康检查**：容器运行状态监控和自动恢复

## 多阶段构建

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

## 总结

Docker 不仅仅是虚拟化的替代品，它彻底改变了软件交付的方式。"Build, Ship, and Run Any App, Anywhere" 的理念让开发环境与生产环境的一致性成为现实。在微服务和云原生时代，Docker 已成为必备技能。
