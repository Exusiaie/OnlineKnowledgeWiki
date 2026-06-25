---
title: Bootstrap
category: 前端开发
tags: [前端, css框架, 响应式]
order: 6
icon: 🅱
---

# Bootstrap 前端 CSS 框架教程

## 概述

Bootstrap 是目前最流行的开源前端 CSS 框架，由 Twitter 的设计师和工程师开发。它提供了一套完整的响应式移动优先的 UI 组件和工具类，让开发者能够快速构建美观、一致的 Web 页面。

## 栅格系统

Bootstrap 的栅格系统基于 12 列布局，使用 Flexbox 实现，支持五种响应式断点：

```html
<div class="container">
    <div class="row">
        <!-- 每种断点下占据不同列数 -->
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">卡片 1</h5>
                    <p class="card-text">内容描述</p>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">卡片 2</h5>
                    <p class="card-text">内容描述</p>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">卡片 3</h5>
                    <p class="card-text">内容描述</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

## 常用组件

Bootstrap 提供了丰富的预置组件，开箱即用：

```html
<!-- 按钮 -->
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-success">成功按钮</button>
<button class="btn btn-danger">危险按钮</button>
<button class="btn btn-outline-secondary">轮廓按钮</button>
<button class="btn btn-lg btn-primary">大按钮</button>

<!-- 导航栏 -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand" href="#">品牌名称</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link active" href="#">首页</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">关于</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">联系</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- 表单 -->
<form>
    <div class="mb-3">
        <label for="email" class="form-label">邮箱地址</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com">
    </div>
    <div class="mb-3">
        <label for="password" class="form-label">密码</label>
        <input type="password" class="form-control" id="password">
    </div>
    <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="remember">
        <label class="form-check-label" for="remember">记住我</label>
    </div>
    <button type="submit" class="btn btn-primary">登录</button>
</form>
```

## 工具类

Bootstrap 的原子化工具类让样式调整非常便捷：

```html
<!-- 间距 -->
<div class="mt-3 mb-4 ms-2 me-2 p-4">
    margin-top-3, margin-bottom-4, margin-start-2, margin-end-2, padding-4
</div>

<!-- 文本 -->
<p class="text-center text-primary fw-bold fs-4">
    居中、蓝色、粗体、字体大小4
</p>

<!-- 显示 -->
<div class="d-flex justify-content-between align-items-center">
    <span>左侧</span>
    <span>右侧</span>
</div>

<!-- 背景与边框 -->
<div class="bg-light border rounded-3 shadow-sm p-4">
    浅色背景、圆角、阴影、内边距
</div>
```

## 响应式断点

Bootstrap 定义了五种响应式断点，采用移动优先策略：

| 断点 | 类前缀 | 屏幕宽度 |
|------|--------|----------|
| Extra small | (无) | < 576px |
| Small | `sm` | >= 576px |
| Medium | `md` | >= 768px |
| Large | `lg` | >= 992px |
| Extra large | `xl` | >= 1200px |
| Extra extra large | `xxl` | >= 1400px |

## 核心特性

- **栅格系统**：12 列 Flexbox 布局，支持多断点响应
- **组件库**：按钮、导航、卡片、表单、模态框、警告框等
- **工具类**：数百个原子化 CSS 类，覆盖间距、颜色、排版
- **响应式断点**：5+ 种断点，移动优先设计
- **主题定制**：Sass 变量和 CSS 自定义属性定制
- **JavaScript 插件**：模态框、下拉菜单、轮播图、提示框
- **图标**：Bootstrap Icons 提供丰富的 SVG 图标
- **辅助功能**：良好的 ARIA 支持，键盘导航

## 主题定制

通过覆盖 Sass 变量来自定义 Bootstrap：

```scss
// custom.scss
$primary: #6f42c1;
$font-family-base: 'Noto Sans SC', sans-serif;
$border-radius: 0.5rem;

@import 'bootstrap/scss/bootstrap';
```

## 总结

Bootstrap 让非设计背景的开发者也能快速搭建专业外观的网页。虽然 Tailwind CSS 等新框架在定制性上更胜一筹，但 Bootstrap 的组件化思维和快速开发能力仍然使其在原型开发、后台管理系统和企业内部工具中非常受欢迎。
