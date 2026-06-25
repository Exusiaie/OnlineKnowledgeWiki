---
title: Flask
category: Python / 数据科学
tags: [python, web框架, 轻量级]
order: 7
icon: 🚀
---

# Flask 轻量级 Web 应用框架教程

## 概述

Flask 是一个基于 Python 的轻量级 Web 应用框架。它被设计为"微框架"，核心保持简单而可扩展，开发者可以根据需要选择各种扩展来增加功能。Flask 使用 Jinja2 作为模板引擎，Werkzeug 作为 WSGI 工具库。

## 微框架理念

Flask 的"微"并不意味着功能不足，而是指核心尽可能小但可扩展。与 Django 的"电池全含"不同，Flask 让开发者自由选择所需的组件，从而避免不必要的复杂性，适合微服务和小型应用的快速开发。

## 快速开始

```python
from flask import Flask, render_template, request, jsonify

# 创建应用实例
app = Flask(__name__)

# 定义路由
@app.route('/')
def hello():
    return '<h1>Hello, Flask!</h1>'

# 带参数的路由
@app.route('/user/<username>')
def show_user(username):
    return f'<h1>Hello, {username}!</h1>'

# JSON API 示例
@app.route('/api/data', methods=['GET', 'POST'])
def handle_data():
    if request.method == 'POST':
        data = request.get_json()
        return jsonify({'status': 'success', 'data': data})
    return jsonify({'message': 'Send a POST request'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## Jinja2 模板引擎

```python
from flask import render_template

@app.route('/welcome')
def welcome():
    user = {'name': 'Alice', 'role': 'admin'}
    items = ['Python', 'Flask', 'Jinja2']
    return render_template('welcome.html', user=user, items=items)
```

## 核心特性

- **路由系统**：支持动态路由、HTTP 方法限定、URL 构建
- **模板渲染**：Jinja2 引擎提供模板继承、宏、过滤器
- **请求处理**：便捷的 request 对象，处理表单、JSON、文件上传
- **扩展机制**：丰富的扩展生态（Flask-SQLAlchemy、Flask-Login 等）
- **Session 管理**：加密的客户端会话存储
- **蓝图**：模块化应用结构，方便大型项目的组织
- **错误处理**：自定义错误页面和处理函数
- **测试支持**：内置测试客户端

## 应用工厂模式

```python
def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    from . import models
    models.init_app(app)

    from . import routes
    app.register_blueprint(routes.bp)

    return app
```

## 总结

Flask 以其简洁、灵活的特点，成为 Python Web 开发的热门选择。它特别适合 API 开发、微服务架构以及需要高度定制化的项目。
