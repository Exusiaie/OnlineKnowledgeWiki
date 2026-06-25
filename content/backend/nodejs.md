---
title: Node.js
category: 后端开发
tags: [后端, nodejs, javascript]
order: 1
icon: 💚
---

# Node.js 服务端 JavaScript 运行时教程

## 概述

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时，使得 JavaScript 可以在服务器端运行。它采用事件驱动、非阻塞 I/O 模型，非常适合构建高并发、实时性要求高的网络应用。Node.js 的出现让前端开发者可以用同一种语言编写前后端代码，极大简化了全栈开发。

## 事件驱动与非阻塞 I/O

Node.js 的核心优势在于其事件循环机制。与传统的多线程模型不同，Node.js 使用单线程事件循环处理并发请求，通过异步回调避免阻塞：

- **非阻塞 I/O**：文件读写、网络请求不会阻塞主线程
- **事件循环**：持续检查并执行待处理的事件和回调
- **高并发**：单个 Node.js 进程可处理成千上万个并发连接

## 基础示例

```javascript
// 引入 HTTP 模块
const http = require('http');

// 创建服务器
const server = http.createServer((req, res) => {
    // 设置响应头
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

    // 路由处理
    if (req.url === '/') {
        res.end('你好，世界！');
    } else if (req.url === '/api/data') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello', time: Date.now() }));
    } else {
        res.writeHead(404);
        res.end('页面未找到');
    }
});

// 监听端口
server.listen(3000, () => {
    console.log('服务器已启动: http://localhost:3000');
});
```

## 模块系统

Node.js 使用 CommonJS 和 ES Modules 两种模块系统：

```javascript
// CommonJS（传统）
const fs = require('fs');
const path = require('path');

// 导出模块
module.exports = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
};

// ES Modules（现代，需 .mjs 文件或 "type": "module"）
import fs from 'fs';
import path from 'path';

export const add = (a, b) => a + b;
export default class Calculator { }
```

## 文件系统操作

```javascript
const fs = require('fs');
const path = require('path');

// 读取文件（异步）
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('读取失败:', err);
        return;
    }
    console.log('文件内容:', data);
});

// 读取文件（同步）
try {
    const data = fs.readFileSync('data.txt', 'utf8');
    console.log('文件内容:', data);
} catch (err) {
    console.error('读取失败:', err);
}

// Promises API（推荐）
const fsPromises = require('fs').promises;

async function readConfig() {
    try {
        const data = await fsPromises.readFile('config.json', 'utf8');
        const config = JSON.parse(data);
        return config;
    } catch (err) {
        console.error('读取配置失败:', err);
        return {};
    }
}

// 写入文件
await fsPromises.writeFile('output.txt', 'Hello, Node.js!');
await fsPromises.appendFile('log.txt', `[${new Date().toISOString()}] 日志\n`);
```

## npm 包管理

```bash
# 初始化项目
npm init -y

# 安装依赖
npm install express
npm install --save-dev nodemon

# 全局安装
npm install -g typescript

# 运行脚本（package.json 中 scripts 定义）
npm run dev
npm start
```

## 核心概念

- **模块系统**：CommonJS（require/module.exports）和 ES Modules
- **文件系统**：fs 模块处理文件读写、目录操作
- **HTTP 模块**：创建 Web 服务器，处理请求和响应
- **npm**：世界上最大的包生态系统
- **事件循环**：timer、pending callbacks、idle、poll、check、close callbacks 各阶段
- **Buffer**：处理二进制数据
- **Stream**：高效处理大数据（可读流、可写流、转换流）
- **Cluster**：多进程利用多核 CPU

## Stream 示例

```javascript
const { createReadStream, createWriteStream } = require('fs');

// 管道操作：从文件读取并写入
const readStream = createReadStream('large-file.txt', { highWaterMark: 64 * 1024 });
const writeStream = createWriteStream('copy.txt');

readStream
    .pipe(writeStream)
    .on('finish', () => {
        console.log('文件复制完成');
    })
    .on('error', (err) => {
        console.error('操作失败:', err);
    });
```

## 总结

Node.js 让 JavaScript 突破了浏览器的限制，成为全栈开发的有力工具。事件驱动的非阻塞 I/O 模型使其在处理大量并发连接时表现出色，特别适合实时聊天、API 网关和微服务等场景。
