---
title: JavaScript
category: 前端开发
tags: [前端, javascript, 编程语言]
order: 2
icon: 💛
---

# JavaScript 前端编程语言教程

## 概述

JavaScript 是 Web 的核心编程语言，最初设计为浏览器端的脚本语言，现已发展成为全栈开发的主力语言。它是唯一被所有主流浏览器原生支持的语言，也是前端开发者必备的核心技能。

## 变量与数据类型

```javascript
// 变量声明
let name = 'Alice';          // 可变的块级作用域变量
const PI = 3.14159;          // 常量
var oldStyle = 'legacy';     // 旧式声明（不推荐）

// 数据类型
let str = "Hello";           // 字符串
let num = 42;                // 数字
let bool = true;             // 布尔值
let arr = [1, 2, 3];        // 数组
let obj = { name: "Alice" }; // 对象
let undef = undefined;       // 未定义
let nil = null;              // 空值
let sym = Symbol('id');      // 符号
```

## DOM 操作

DOM（Document Object Model）是浏览器提供的编程接口：

```javascript
// 选择元素
const app = document.querySelector('#app');
const items = document.querySelectorAll('.item');

// 修改内容
app.textContent = 'Hello, JavaScript!';
app.innerHTML = '<strong>加粗文本</strong>';

// 修改样式
app.style.color = 'blue';
app.classList.add('active');
app.classList.toggle('hidden');

// 创建和插入元素
const div = document.createElement('div');
div.textContent = '新元素';
app.appendChild(div);

// 移除元素
div.remove();
```

## 事件处理

```javascript
// 点击事件
const button = document.querySelector('#btn');
button.addEventListener('click', (event) => {
    console.log('按钮被点击了', event.target);
});

// 表单事件
const form = document.querySelector('#myForm');
form.addEventListener('submit', (event) => {
    event.preventDefault();  // 阻止默认提交
    const formData = new FormData(form);
    console.log('表单数据:', Object.fromEntries(formData));
});

// 键盘事件
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 事件委托
document.querySelector('#list').addEventListener('click', (event) => {
    if (event.target.matches('.item')) {
        console.log('列表项被点击:', event.target.textContent);
    }
});
```

## 异步编程

```javascript
// Promise 链式调用
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        console.log('获取到数据:', data);
    })
    .catch(error => {
        console.error('请求失败:', error);
    });

// Async / Await（推荐写法）
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        console.log('获取到数据:', data);
        return data;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
}

// 并发请求
const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
]);
```

## 核心概念

- **DOM 操作**：查询、修改、创建、删除页面元素
- **事件处理**：用户交互的监听与响应（点击、键盘、表单）
- **异步编程**：Promise、async/await、事件循环（Event Loop）
- **ES6+ 新特性**：箭头函数、解构、模板字符串、默认参数
- **闭包**：函数访问其外部作用域变量的能力
- **原型链**：JavaScript 的继承机制
- **模块化**：ES Modules（import/export）组织代码
- **错误处理**：try-catch-finally 机制

## ES6+ 常用特性

```javascript
// 箭头函数
const add = (a, b) => a + b;

// 解构赋值
const { name, age } = user;
const [first, second] = array;

// 模板字符串
const message = `Hello, ${name}! You are ${age} years old.`;

// 展开运算符
const merged = { ...obj1, ...obj2 };
const copy = [...array];

// 可选链
const city = user?.address?.city;

// Nullish 合并
const value = input ?? '默认值';
```

## 闭包示例

```javascript
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getValue());  // 2
```

## 总结

JavaScript 是前端开发的灵魂。从简单的页面交互到复杂的单页应用，都离不开它。深入理解 DOM、事件模型和异步编程是成为优秀前端开发者的必经之路。ES6+ 的新特性让 JavaScript 更加现代化和表达力更强。
