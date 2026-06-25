---
title: Vue.js
category: 前端开发
tags: [前端, vue, 框架]
order: 3
icon: 💚
---

# Vue.js 渐进式前端框架教程

## 概述

Vue.js（简称 Vue）是一个用于构建用户界面的渐进式 JavaScript 框架。它的核心库只关注视图层，并且可以轻松地与其他库或现有项目集成。Vue 的设计理念是逐级递推，你可以从简单的页面增强开始，逐步扩展到复杂的单页应用。

由尤雨溪（Evan You）创建，Vue 兼具 React 的灵活性和 Angular 的结构性，在中文社区拥有庞大的用户基础。

## 响应式数据绑定

Vue 的核心是响应式系统，当数据发生变化时，视图会自动更新：

```javascript
import { createApp, ref, reactive, computed, watch } from 'vue';

const app = createApp({
    setup() {
        // ref：包装基本类型数据
        const message = ref('Hello, Vue!');
        const count = ref(0);

        // reactive：包装对象类型数据
        const user = reactive({
            name: 'Alice',
            email: 'alice@example.com'
        });

        // computed：计算属性（自动缓存）
        const greeting = computed(() => {
            return `${message.value}, ${user.name}!`;
        });

        // watch：监听数据变化
        watch(count, (newVal, oldVal) => {
            console.log(`计数从 ${oldVal} 变为 ${newVal}`);
        });

        // 方法
        function increment() {
            count.value++;
        }

        return { message, count, user, greeting, increment };
    }
});

app.mount('#app');
```

## 模板语法

```html
<div id="app">
    <!-- 文本插值 -->
    <h1>{{ message }}</h1>
    <p>{{ greeting }}</p>

    <!-- 属性绑定 -->
    <img :src="imageUrl" :alt="imageAlt">

    <!-- 条件渲染 -->
    <div v-if="isLoggedIn">欢迎回来，{{ user.name }}!</div>
    <div v-else>请登录</div>

    <!-- 列表渲染 -->
    <ul>
        <li v-for="(item, index) in items" :key="item.id">
            {{ index }}: {{ item.text }}
        </li>
    </ul>

    <!-- 事件处理 -->
    <button @click="increment">点击次数: {{ count }}</button>

    <!-- 表单绑定 -->
    <input v-model="message" placeholder="编辑消息">
</div>
```

## 单文件组件（SFC）

Vue 的 `.vue` 文件将模板、脚本和样式封装在一个文件中：

```vue
<template>
    <div class="todo-item">
        <input
            type="checkbox"
            :checked="todo.done"
            @change="toggle"
        >
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="$emit('remove', todo.id)">删除</button>
    </div>
</template>

<script setup>
// Composition API + <script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    todo: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['toggle', 'remove']);

function toggle() {
    emit('toggle', props.todo.id);
}
</script>

<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    padding: 8px;
}
.done {
    text-decoration: line-through;
    color: #999;
}
</style>
```

## 核心特性

- **响应式系统**：基于 Proxy 的响应式数据绑定，自动追踪依赖
- **组件化**：单文件组件（SFC），模板、逻辑和样式封装
- **Composition API**：灵活的逻辑复用和代码组织方式
- **Vue Router**：官方路由管理器，支持动态路由和导航守卫
- **Pinia**：新一代状态管理库，简洁的类型安全和直观的 API
- **Teleport**：将组件渲染到 DOM 树的指定位置
- **Suspense**：优雅处理异步组件加载状态
- **Vite**：官方构建工具，极快的开发服务器和构建速度

## 生命周期钩子

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue';

onMounted(() => {
    console.log('组件已挂载，可以访问 DOM');
});

onUpdated(() => {
    console.log('组件已更新');
});

onUnmounted(() => {
    console.log('组件即将卸载，清理资源');
});
```

## 总结

Vue.js 以其渐进式、易上手和功能全面的特点，成为了前端开发的热门选择。无论你是构建简单的交互组件还是复杂的企业级应用，Vue 都能提供合适的解决方案。Composition API 和 Pinia 的组合，让大型应用的代码组织更加清晰。
