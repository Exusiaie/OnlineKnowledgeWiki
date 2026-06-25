---
title: Nginx
category: DevOps
tags: [devops, nginx, web服务器, 反向代理]
order: 5
icon: 🟢
---

# Nginx 高性能 Web 服务器与反向代理教程

## 概述

Nginx（读作 "Engine X"）是由俄罗斯程序员 Igor Sysoev 开发的高性能 HTTP 和反向代理服务器。它以其高并发处理能力（C10K 问题）、低内存消耗和灵活的配置著称，被全球超过三分之一的网站使用，包括 Netflix、Airbnb 和 GitHub。

Nginx 既可以作为 Web 服务器直接提供静态文件，也可以作为反向代理将请求转发到后端应用服务器（如 Node.js、Django、Spring Boot）。

## Nginx vs Apache

| 特性 | Nginx | Apache |
|------|-------|--------|
| 架构 | 事件驱动、异步非阻塞 | 进程/线程驱动 |
| 并发能力 | 极高（数万连接） | 较低 |
| 内存占用 | 低且稳定 | 较高 |
| 静态文件 | 极快 | 较快 |
| 动态内容 | 需配合后端 | 内置模块 |
| 配置 | 简洁清晰 | 复杂灵活 |
| .htaccess | 不支持 | 支持 |

## 安装

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# macOS
brew install nginx

# 启动与管理
sudo systemctl start nginx     # 启动
sudo systemctl stop nginx      # 停止
sudo systemctl restart nginx   # 重启
sudo systemctl reload nginx    # 重载配置（不中断服务）
sudo systemctl enable nginx    # 开机自启
sudo systemctl status nginx    # 查看状态

# 测试配置
sudo nginx -t
sudo nginx -T                  # 测试并打印配置
```

## 配置文件结构

```nginx
# /etc/nginx/nginx.conf（主配置文件）

user www-data;
worker_processes auto;          # 自动匹配 CPU 核心数
pid /run/nginx.pid;

events {
    worker_connections 1024;    # 每个 worker 的最大连接数
    use epoll;                  # Linux 下使用 epoll
}

http {
    # 基础设置
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;

    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';

    access_log /var/log/nginx/access.log main;
    error_log /var/log/nginx/error.log warn;

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    # 包含站点配置
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

## 静态文件服务器

```nginx
server {
    listen 80;
    server_name static.example.com;

    root /var/www/static;
    index index.html index.htm;

    # 静态文件缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # HTML 文件不缓存
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache";
    }

    # 404 页面
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
```

## 反向代理

反向代理是 Nginx 最常用的功能之一：

```nginx
upstream backend {
    # 负载均衡策略
    # 默认：轮询（round-robin）
    # least_conn：最少连接
    # ip_hash：IP 哈希（会话保持）

    server 127.0.0.1:3000 weight=3;  # weight 权重
    server 127.0.0.1:3001 weight=1;
    server 127.0.0.1:3002 backup;    # 备用服务器
}

server {
    listen 80;
    server_name api.example.com;

    # 代理头设置
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # 主路由
    location / {
        proxy_pass http://backend;
        proxy_connect_timeout 30s;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;

        # 缓冲设置
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 16k;
    }

    # WebSocket 代理
    location /ws {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 3600s;
    }
}
```

## HTTPS 配置

```nginx
server {
    listen 443 ssl http2;
    server_name example.com www.example.com;

    # SSL 证书
    ssl_certificate /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;

    # 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # HSTS（HTTP 严格传输安全）
    add_header Strict-Transport-Security "max-age=63072000" always;

    location / {
        proxy_pass http://localhost:3000;
    }
}

# HTTP 自动跳转到 HTTPS
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}
```

## 负载均衡策略

```nginx
upstream app_cluster {
    # 轮询（默认）
    server backend1:3000;
    server backend2:3000;

    # 最少连接
    # least_conn;

    # IP 哈希（会话保持）
    # ip_hash;

    # 哈希（自定义键）
    # hash $request_uri consistent;
}

server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://app_cluster;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503;
    }
}
```

## 限流与安全

```nginx
# 限制请求速率
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

# 限制连接数
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
    listen 80;
    server_name api.example.com;

    # 应用限流
    location /api/ {
        limit_req zone=mylimit burst=20 nodelay;
        limit_conn addr 10;
        proxy_pass http://backend;
    }

    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # 阻止恶意 User-Agent
    if ($http_user_agent ~* (bot|crawler|spider|scraper)) {
        return 403;
    }

    # 限制请求方法
    if ($request_method !~ ^(GET|POST|HEAD)$) {
        return 405;
    }
}
```

## 常用命令速查

```bash
# 测试配置
nginx -t

# 重载配置（不中断服务）
nginx -s reload

# 停止服务
nginx -s stop     # 立即停止
nginx -s quit     # 优雅停止

# 重新打开日志文件
nginx -s reopen

# 查看版本和编译选项
nginx -V
```

## 核心功能

- **反向代理**：将请求转发到后端服务器，客户端不直接与后端通信
- **负载均衡**：轮询、最少连接、IP 哈希、一致性哈希
- **静态文件**：高效地直接提供静态资源
- **HTTPS 配置**：SSL/TLS 证书配置和 HTTP/2 支持
- **WebSocket**：支持 WebSocket 代理
- **缓存**：proxy_cache 代理缓存和 fastcgi_cache
- **限流**：limit_req 和 limit_conn 模块
- **重写规则**：URL 重写和重定向

## 总结

Nginx 是现代 Web 架构中的关键组件。它以极低的资源消耗处理海量并发连接，无论是作为前端静态服务器、反向代理、还是负载均衡器，都表现出色。掌握 Nginx 配置是 DevOps 和后端工程师的必备功课，合理配置能显著提升应用的性能和安全性。
