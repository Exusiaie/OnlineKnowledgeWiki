---
title: jQuery
category: 前端开发
tags: [前端, jquery, dom操作]
order: 7
icon: 📝
---

# jQuery 经典 JavaScript 库教程

## 概述

jQuery 是一个快速、轻量级的 JavaScript 库，它极大地简化了 HTML 文档操作、事件处理、动画效果和 AJAX 请求。尽管现代前端框架（Vue、React）已逐渐取代 jQuery 在新建项目中的地位，但它仍然在大量现有项目中广泛使用，是前端开发者需要了解的重要工具。

jQuery 的口号是 "Write Less, Do More"（写更少，做更多），它抽象了浏览器差异，提供了统一的 API。

## 选择器与 DOM 操作

jQuery 最核心的功能是通过 CSS 选择器快速定位和操作 DOM 元素：

```javascript
// 基础选择器
$('#myId');                          // ID 选择器
$('.myClass');                       // 类选择器
$('p');                              // 元素选择器
$('div.container p.highlight');      // 复合选择器

// DOM 内容操作
$('#app').text('Hello, jQuery!');    // 设置文本
$('#app').html('<strong>加粗</strong>'); // 设置 HTML
$('#input').val('默认值');            // 设置表单值

// DOM 属性操作
$('img').attr('src', 'new.jpg');     // 设置属性
$('a').attr('href');                 // 获取属性
$('#box').addClass('active');        // 添加类
$('#box').removeClass('hidden');     // 移除类
$('#box').toggleClass('dark');       // 切换类

// CSS 操作
$('#box').css('color', 'red');
$('#box').css({
    'background-color': '#f5f5f5',
    'border-radius': '8px'
});
```

## DOM 遍历

```javascript
// 向上遍历
$('#item').parent();         // 父元素
$('#item').parents('.list'); // 匹配的祖先元素

// 向下遍历
$('#list').children();       // 直接子元素
$('#list').find('.active');  // 所有后代匹配元素

// 同级遍历
$('#item').siblings();       // 所有同级元素
$('#item').next();           // 下一个同级元素
$('#item').prev();           // 上一个同级元素

// 过滤
$('li').first();             // 第一个
$('li').last();              // 最后一个
$('li').eq(2);               // 索引为 2 的元素
$('li').filter('.active');   // 筛选匹配选择器的
```

## 事件处理

jQuery 提供了跨浏览器兼容的事件绑定机制：

```javascript
// 基础事件绑定
$('#btn').click(function() {
    $(this).hide();
    console.log('按钮被点击');
});

// 等效写法
$('#btn').on('click', function() {
    alert('Hello!');
});

// 多个事件
$('#input').on({
    focus: function() {
        $(this).addClass('focused');
    },
    blur: function() {
        $(this).removeClass('focused');
    },
    keydown: function(event) {
        if (event.key === 'Enter') {
            submitForm();
        }
    }
});

// 事件委托（动态元素事件绑定）
$('#list').on('click', '.item', function() {
    $(this).toggleClass('selected');
});

// 一次性事件
$('#btn').one('click', function() {
    console.log('只执行一次');
});
```

## AJAX 请求

jQuery 封装了 AJAX，让异步数据请求变得简单：

```javascript
// GET 请求
$.get('/api/users', { page: 1, limit: 10 }, function(data) {
    console.log('获取到数据:', data);
});

// POST 请求
$.post('/api/users', { name: 'Alice', email: 'alice@example.com' }, function(response) {
    console.log('创建成功:', response);
});

// 通用 AJAX
$.ajax({
    url: '/api/data',
    method: 'GET',
    dataType: 'json',
    data: { id: 123 },
    beforeSend: function() {
        $('#loading').show();
    },
    success: function(data) {
        renderData(data);
    },
    error: function(xhr, status, error) {
        console.error('请求失败:', error);
    },
    complete: function() {
        $('#loading').hide();
    }
});
```

## 动画效果

```javascript
// 显示/隐藏
$('#box').show(400);         // 400ms 动画
$('#box').hide('slow');      // 慢速
$('#box').toggle();

// 淡入/淡出
$('#box').fadeIn();
$('#box').fadeOut();
$('#box').fadeToggle(500);

// 滑动
$('#box').slideDown();
$('#box').slideUp();
$('#box').slideToggle();

// 自定义动画
$('#box').animate({
    width: '300px',
    height: '200px',
    opacity: 0.5
}, 1000, function() {
    console.log('动画完成');
});
```

## 核心特性

- **选择器**：CSS 选择器定位元素，链式调用
- **DOM 遍历**：灵活的向上、向下、同级遍历和过滤
- **事件绑定**：统一的跨浏览器事件处理，事件委托支持
- **AJAX**：简洁的异步请求 API，支持 JSON 等多种格式
- **动画效果**：内置淡入淡出、滑动、自定义动画
- **工具函数**：extend、each、map、grep 等实用工具
- **插件生态**：丰富的第三方插件（jQuery UI、jQuery Validation 等）
- **链式调用**：几乎所有方法都返回 jQuery 对象

## 总结

虽然现代前端开发已经转向 Vue、React 等框架，jQuery 仍不失为学习前端的重要一环。它简洁的 API 设计和跨浏览器兼容性让 DOM 操作变得优雅，理解 jQuery 也有助于维护大量现有项目。对于简单的页面交互和快速原型，jQuery 仍然是有效的选择。
