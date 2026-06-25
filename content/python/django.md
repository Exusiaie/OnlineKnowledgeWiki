---
title: Django
category: Python / 数据科学
tags: [python, web框架, 后端]
order: 6
icon: 🌐
---

# Django Python Web 框架教程

## 概述

Django 是一个高级 Python Web 框架，遵循 MTV（Model-Template-View）架构模式，鼓励快速开发和干净、实用的设计。由新闻网站开发团队创建，现已成为 Python 生态中最流行的 Web 框架之一。

## MTV 架构模式

Django 的 MTV 架构将应用分为三个核心部分：

- **Model（模型）**：处理数据结构和数据库交互
- **Template（模板）**：负责用户界面的呈现
- **View（视图）**：处理业务逻辑，连接 Model 和 Template

## 快速开始

创建 Django 项目的基本命令：

```bash
# 安装 Django
pip install django

# 创建项目
django-admin startproject mysite

# 进入项目目录
cd mysite

# 创建应用
python manage.py startapp blog

# 运行开发服务器
python manage.py runserver
```

## 定义模型

使用 ORM 定义数据库模型：

```python
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
```

## 数据库迁移

```bash
# 生成迁移文件
python manage.py makemigrations

# 应用迁移
python manage.py migrate
```

## 核心功能

Django 提供了丰富的内置功能，涵盖 Web 开发的各个方面：

- **ORM 支持**：强大的对象关系映射，支持多种数据库后端
- **Admin 后台**：自动生成管理界面，快速实现数据管理
- **表单处理**：内置表单验证、渲染和安全防护（CSRF）
- **用户认证**：完整的用户注册、登录、权限管理系统
- **中间件**：灵活的请求/响应处理管道
- **URL 路由**：优雅的 URL 配置和反向解析
- **模板引擎**：Django Template Language，支持继承和过滤器
- **缓存系统**：多级缓存策略提升性能
- **国际化**：完善的多语言支持

## 总结

Django 以其 "电池全含" 的理念，为开发者提供了构建复杂 Web 应用所需的一切工具，特别适合需要快速交付的内容管理系统和企业级应用。
