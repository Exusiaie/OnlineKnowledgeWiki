---
title: HTML / CSS
category: 前端开发
tags: [前端, html, css, 基础]
order: 1
icon: 🎨
---

# HTML / CSS 基础教程

## 概述

HTML（HyperText Markup Language）定义网页的结构和内容，CSS（Cascading Style Sheets）控制网页的视觉呈现。两者相辅相成，是 Web 开发的基石。掌握 HTML/CSS 是成为前端开发者的第一步。

## HTML 基础结构

HTML 使用标签（Tag）来描述页面内容的语义和结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的网页</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>欢迎来到我的网站</h1>
        <nav>
            <a href="/">首页</a>
            <a href="/about">关于</a>
            <a href="/contact">联系</a>
        </nav>
    </header>

    <main>
        <article>
            <h2>文章标题</h2>
            <p>这是文章内容段落。</p>
        </article>

        <aside>
            <h3>侧边栏</h3>
            <ul>
                <li>相关链接</li>
                <li>热门推荐</li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2024 我的网站</p>
    </footer>
</body>
</html>
```

## CSS 基础

CSS 通过选择器定位 HTML 元素并应用样式：

```css
/* 基本选择器 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* 类选择器 */
.title {
    font-size: 2em;
    color: #333;
}

/* ID 选择器 */
#header {
    background-color: #f5f5f5;
}

/* 后代选择器 */
.article p {
    line-height: 1.6;
    color: #666;
}
```

## 盒模型

CSS 盒模型是理解布局的基础，每个元素都可以看作一个盒子：

```css
.box {
    /* 内容区域 */
    width: 300px;
    height: 200px;

    /* 内边距 */
    padding: 20px;

    /* 边框 */
    border: 2px solid #333;

    /* 外边距 */
    margin: 10px;

    /* 设置盒模型类型 */
    box-sizing: border-box;  /* width/height 包含 padding 和 border */
}
```

## Flexbox 布局

Flexbox 是一维布局模型，擅长在行或列上分配空间：

```css
.flex-container {
    display: flex;
    justify-content: space-between;  /* 水平对齐 */
    align-items: center;             /* 垂直对齐 */
    gap: 20px;                       /* 间距 */
    flex-wrap: wrap;                 /* 换行 */
}

.flex-item {
    flex: 1;  /* 等分剩余空间 */
}
```

## Grid 布局

Grid 是二维布局系统，适合复杂的页面布局：

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 三列等宽 */
    grid-template-rows: auto;
    gap: 20px;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}
```

## 核心知识

- **语义化标签**：header、nav、main、article、section、footer 等
- **Flexbox**：现代一维布局方案，对齐和空间分配
- **Grid**：强大的二维布局系统
- **选择器**：元素、类、ID、属性、伪类选择器
- **盒模型**：content-box vs border-box
- **响应式设计**：媒体查询、弹性布局、相对单位
- **CSS 变量**：自定义属性实现主题化和复用
- **动画与过渡**：transition 和 animation 属性

## 响应式设计

```css
/* 移动优先设计 */
.container {
    width: 100%;
    padding: 15px;
}

/* 平板 */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* 桌面 */
@media (min-width: 1024px) {
    .container {
        width: 960px;
    }
}

/* 大屏 */
@media (min-width: 1200px) {
    .container {
        width: 1140px;
    }
}
```

## 总结

HTML 和 CSS 是前端开发的入门基础。HTML5 提供的语义化标签让页面结构更清晰，CSS3 的 Flexbox、Grid 等新特性让布局更加灵活强大。学好 HTML/CSS，后续学习 JavaScript 和前端框架会更加得心应手。
