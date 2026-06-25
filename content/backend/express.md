---
title: Express
category: 后端开发
tags: [后端, nodejs, web框架]
order: 6
icon: 🚂
---

# Express Node.js Web 框架教程

## 概述

Express 是 Node.js 最流行的 Web 应用框架，以其简洁、灵活和高性能著称。它提供了一套精简但强大的 API 来构建 Web 应用和 RESTful API。作为 Node.js 生态的基础设施，无数框架（如 NestJS、Sails.js）都建立在 Express 之上。

## 核心哲学

Express 的核心是"中间件"模式。每个请求都会经过一系列中间件函数的处理，每个函数可以对请求和响应进行操作，或将其传递给下一个中间件。这种设计赋予了开发者极大的灵活性。

## 快速开始

```bash
# 初始化项目
npm init -y

# 安装 Express
npm install express
```

```javascript
const express = require('express');
const app = express();

// 内置中间件：解析 JSON 请求体
app.use(express.json());

// 内置中间件：解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));

// 路由
app.get('/', (req, res) => {
    res.json({ message: 'Hello, Express!' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
```

## 路由系统

Express 的路由系统支持多种 HTTP 方法和路径模式：

```javascript
const express = require('express');
const router = express.Router();

// 基本路由
router.get('/users', (req, res) => {
    res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});

// 动态路由参数
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ id: userId, name: 'Alice' });
});

// 查询参数
router.get('/search', (req, res) => {
    const { q, page, limit } = req.query;
    res.json({ query: q, page, limit });
});

// POST 请求
router.post('/users', (req, res) => {
    const { name, email } = req.body;
    // 创建用户逻辑...
    res.status(201).json({ id: 3, name, email });
});

// PUT 请求
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    res.json({ id, name, updated: true });
});

// DELETE 请求
router.delete('/users/:id', (req, res) => {
    res.json({ message: `用户 ${req.params.id} 已删除` });
});

// 挂载路由
app.use('/api', router);
```

## 中间件

中间件是 Express 的灵魂。可以自定义中间件实现各种功能：

```javascript
// 日志中间件
function logger(req, res, next) {
    const start = Date.now();
    console.log(`${req.method} ${req.url}`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    });

    next();
}

// 认证中间件
function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: '未授权访问' });
    }

    try {
        // 验证 token 逻辑...
        req.user = { id: 1, name: 'Alice' };
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token 无效' });
    }
}

// 错误处理中间件（必须四个参数）
function errorHandler(err, req, res, next) {
    console.error('服务器错误:', err.stack);

    res.status(err.status || 500).json({
        error: {
            message: err.message || '内部服务器错误',
            status: err.status || 500
        }
    });
}

// 使用中间件
app.use(logger);
app.use('/api/admin', authenticate);
app.use(errorHandler); // 错误处理中间件放在最后
```

## 模板引擎

Express 支持多种模板引擎，如 EJS、Pug、Handlebars：

```javascript
// 设置模板引擎
app.set('view engine', 'ejs');
app.set('views', './views');

// 渲染模板
app.get('/welcome', (req, res) => {
    res.render('welcome', {
        title: '欢迎页面',
        user: { name: 'Alice', role: 'admin' },
        items: ['项目一', '项目二', '项目三']
    });
});
```

## 核心特性

- **路由**：灵活的路由定义，支持参数、查询串和正则
- **中间件**：请求-响应周期中的可复用处理函数
- **模板引擎**：EJS、Pug、Handlebars 等服务器端渲染
- **错误处理**：中间件式错误处理，同步和异步错误都能捕获
- **静态文件**：内置静态文件服务
- **请求对象**：丰富的 req 对象（params、query、body、headers）
- **响应对象**：res.json()、res.send()、res.status()、res.redirect()
- **路由模块化**：express.Router 实现路由分离

## 文件上传示例

```javascript
const multer = require('multer');
const path = require('path');

// 配置存储
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('只允许图片文件'));
        }
    }
});

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: '请选择文件' });
    }
    res.json({ filename: req.file.filename, path: req.file.path });
});
```

## 总结

Express 以其简单优雅的设计，为 Node.js Web 开发奠定了坚实基础。虽然新的框架不断涌现（NestJS、Fastify），但 Express 依然是最为广泛使用的选择。它的中间件机制和丰富的生态，能让开发者快速构建从 RESTful API 到完整 Web 应用的各种服务。
