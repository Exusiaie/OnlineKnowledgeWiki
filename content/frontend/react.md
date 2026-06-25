---
title: React
category: 前端开发
tags: [前端, react, 框架]
order: 4
icon: ⚛
---

# React 前端框架教程

## 概述

React 是由 Facebook（现 Meta）开发的用于构建用户界面的 JavaScript 库。它采用声明式的编程风格，通过组件化构建复杂的 UI。React 引入了 Virtual DOM（虚拟 DOM）和 JSX 语法，彻底改变了前端开发的方式。

## JSX 语法

JSX 是 JavaScript 的语法扩展，允许在 JS 中编写类似 HTML 的标记：

```jsx
function Greeting({ user }) {
    const getGreeting = (name) => `Hello, ${name}!`;

    return (
        <div className="greeting">
            <h1>{getGreeting(user.name)}</h1>
            {user.isAdmin && <span className="badge">管理员</span>}
            <ul>
                {user.hobbies.map(hobby => (
                    <li key={hobby}>{hobby}</li>
                ))}
            </ul>
        </div>
    );
}
```

## Hooks

Hooks 是 React 16.8 引入的革命性特性，让函数组件也能使用状态和生命周期功能：

```jsx
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

function CounterApp() {
    // useState：管理组件状态
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    // useRef：引用 DOM 或保存可变值
    const inputRef = useRef(null);

    // useEffect：处理副作用
    useEffect(() => {
        document.title = `点击了 ${count} 次`;

        // 清理函数
        return () => {
            document.title = 'React App';
        };
    }, [count]); // 依赖数组

    // useMemo：缓存计算结果
    const doubleCount = useMemo(() => {
        return count * 2;
    }, [count]);

    // useCallback：缓存函数引用
    const increment = useCallback(() => {
        setCount(c => c + 1);
    }, []);

    return (
        <div>
            <p>计数: {count}</p>
            <p>双倍: {doubleCount}</p>
            <button onClick={increment}>+1</button>
            <input
                ref={inputRef}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="输入名字"
            />
            <button onClick={() => inputRef.current.focus()}>
                聚焦输入框
            </button>
        </div>
    );
}
```

## 自定义 Hooks

自定义 Hooks 是复用状态逻辑的利器：

```jsx
// 自定义 Hook：数据获取
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(url);
                const json = await response.json();
                if (!cancelled) {
                    setData(json);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        fetchData();
        return () => { cancelled = true; };
    }, [url]);

    return { data, loading, error };
}

// 使用
function UserList() {
    const { data, loading, error } = useFetch('/api/users');

    if (loading) return <div>加载中...</div>;
    if (error) return <div>错误: {error}</div>;
    return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

## 核心特性

- **JSX**：JavaScript 的语法扩展，直观描述 UI 结构
- **Hooks**：useState、useEffect、useContext、useReducer 等
- **Virtual DOM**：高效的差异化算法，最小化 DOM 操作
- **状态管理**：Context API、Redux、Zustand、Jotai
- **React Router**：声明式路由，支持嵌套和动态路由
- **性能优化**：React.memo、useMemo、useCallback、lazy 加载
- **错误边界**：捕获子组件树中的错误
- **Refs**：直接访问 DOM 节点和 React 组件实例

## Context 状态共享

```jsx
// 创建 Context
const ThemeContext = React.createContext('light');

// Provider 提供数据
function App() {
    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

// Consumer 消费数据
function Toolbar() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div className={`toolbar ${theme}`}>
            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
                切换主题
            </button>
        </div>
    );
}
```

## 总结

React 以其声明式、组件化和高效的特性，成为了全球最流行的前端库之一。Hooks 的引入让函数组件成为主流，自定义 Hooks 极大地提升了逻辑复用能力。庞大的社区生态让 React 几乎可以胜任任何类型的 Web 应用开发。
